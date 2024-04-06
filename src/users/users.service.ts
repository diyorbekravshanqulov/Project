import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './model/user.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { MailService } from '../mail/mail.service';
import { LoginUserDto } from './dto/login_user.dto';
import { FindUserDto } from './dto/find_user.dto';
import { Op } from 'sequelize';
import { PhoneUserDto } from '../bot/dto/phone-user.dto';
import * as otpGenerator from 'otp-generator';
import { BotService } from '../bot/bot.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private readonly userRepo: typeof Users, // Injecting the Sequelize model for User
    private readonly jwtService: JwtService, // Injecting the JwtService for token generation
    private readonly mailService: MailService,
    private readonly botService: BotService
  ) {}

  // Method to generate access and refresh tokens for a given user
  async getTokens(user: Users) {
    const payload = {
      id: user.id,
      isActive: user.isActive,
      isOwner: user.isOwner,
    };
    const [accessToken, refreshToken] = await Promise.all([
      // Signing access token with specified expiration and secret key
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      // Signing refresh token with specified expiration and secret key
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // Method to register a new user
  async registration(createUserDto: CreateUserDto, res: Response) {
    // Check if user with the same email already exists
    const user = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException('This user already exists');
    }
    // Check if password and confirm password match
    if (createUserDto.password !== createUserDto.confirPassword) {
      throw new BadRequestException('Password does not match');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    // Create a new user with hashed password
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashedPassword,
    });

    // Generate tokens for the new user
    const tokens = await this.getTokens(newUser);

    // Hash the refresh token and generate activation link
    const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 7);
    const activationLink = v4();

    // Update the user with hashed refresh token and activation link
    const updatedUser = await this.userRepo.update(
      { hashedRefreshToken, activationLink },
      { where: { id: newUser.id }, returning: true },
    );

    // Set refresh token as a cookie in the response
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
      httpOnly: true, // HTTP only cookie
    });

    try {
      await this.mailService.sendMail(updatedUser[1][0]);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Send error');
    }

    // Prepare response object
    const response = {
      message: 'User registered',
      user: updatedUser[1][0],
      tokens,
    };

    return response; // Return the response object
  }

  // Method to create a new user
  async create(createUserDto: CreateUserDto) {
    return this.userRepo.create(createUserDto);
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }
    const updateUser = await this.userRepo.update(
      { isActive: true },
      {
        where: { activationLink: link, isActive: false },
        returning: true,
      },
    );
    if (!updateUser[1][0]) {
      throw new BadRequestException('User already activated');
    }
    const response = {
      message: 'User activated successfully',
      user: updateUser[1][0].isActive,
    };
    return response;
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (!user.isActive) {
      throw new BadRequestException('User not activated');
    }
    const isMatchPass = await bcrypt.compare(password, user.hashedPassword);

    if (!isMatchPass) {
      throw new BadRequestException('Password is not match');
    }

    const tokens = await this.getTokens(user);

    // Hash the refresh token and generate activation link
    const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 7);
    const activationLink = v4();

    // Update the user with hashed refresh token and activation link
    const updatedUser = await this.userRepo.update(
      { hashedRefreshToken, activationLink },
      { where: { id: user.id }, returning: true },
    );

    // Set refresh token as a cookie in the response
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
      httpOnly: true, // HTTP only cookie
    });

    // Prepare response object
    const response = {
      message: 'User registered',
      user: updatedUser[1][0],
      tokens,
    };

    return response; // Return the response object
  }

  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!userData) {
      throw new ForbiddenException('User not verified');
    }

    const updateUser = await this.userRepo.update(
      {
        hashedPassword: null,
      },
      {
        where: { id: userData.id },
        returning: true,
      },
    );
    res.clearCookie('refresh_token');
    const reponse = {
      message: 'User logged out successfully',
      user_refresh_token: updateUser[1][0].hashedRefreshToken,
    };
    return reponse;
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    console.log(refreshToken);

    const decodecToken = await this.jwtService.decode(refreshToken);
    if (userId != decodecToken['id']) {
      throw new BadRequestException('user not found');
    }
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user || !user.hashedRefreshToken) {
      throw new BadRequestException('user not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbiddin');
    }

    const tokens = await this.getTokens(user);

    // Hash the refresh token and generate activation link
    const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 7);
    const activationLink = v4();

    // Update the user with hashed refresh token and activation link
    const updatedUser = await this.userRepo.update(
      { hashedRefreshToken, activationLink },
      { where: { id: user.id }, returning: true },
    );

    // Set refresh token as a cookie in the response
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 1000, // 15 days expiration time
      httpOnly: true, // HTTP only cookie
    });

    // Prepare response object
    const response = {
      message: 'User refreshed',
      user: updatedUser[1][0],
      tokens,
    };

    return response;
  }

  async findUser(findUserDto: FindUserDto) {
    const where = {};
    if (findUserDto.fullName) {
      where['fullName'] = {
        [Op.like]: `%${findUserDto.fullName}%`,
      };
    }

    if (findUserDto.email) {
      where['email'] = {
        [Op.like]: `%${findUserDto.email}%`,
      };
    }

    if (findUserDto.phone) {
      where['phone'] = {
        [Op.like]: `%${findUserDto.phone}%`,
      };
    }

    if (findUserDto.tgLink) {
      where['tgLink'] = {
        [Op.like]: `%${findUserDto.tgLink}%`,
      };
    }

    console.log(where);

    const users = await this.userRepo.findAll({ where });

    if (users) {
      throw new BadRequestException('User not found');
    }

    return users;
  }

  async newOTP(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const isSend = await this.botService.sendOtp(phone_number, otp)
    if (!isSend) {
      throw new BadRequestException("Before You have to register from bot")
    }
    return { message: "Ok" }
  }

  // Method to find all users
  async findAll() {
    return this.userRepo.findAll();
  }

  // Method to find a user by ID
  async findOne(id: number) {
    return this.userRepo.findByPk(id);
  }

  // Method to update a user by ID
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return user[1][0];
  }

  // Method to remove a user by ID
  async remove(id: number) {
    const userRows = await this.userRepo.destroy({ where: { id } });
    if (userRows == 0) return 'Not found';
    return 'removed successfully';
  }
}
