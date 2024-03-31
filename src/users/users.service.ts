import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './model/user.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private readonly userRepo: typeof Users, // Injecting the Sequelize model for User
    private readonly jwtService: JwtService, // Injecting the JwtService for token generation
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
