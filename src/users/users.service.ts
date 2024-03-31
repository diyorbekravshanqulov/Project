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
    @InjectModel(Users) private readonly userRepo: typeof Users,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(user: Users) {
    const payload = {
      id: user.id,
      isActive: user.isActive,
      isOwner: user.isOwner,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
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

  async registration(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException('This user already exist');
    }
    if (createUserDto.password !== createUserDto.confirPassword) {
      throw new BadRequestException('Password is not match');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashedPassword,
    });

    const tokens = await this.getTokens(newUser);

    const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 7);
    const activationLink = v4();
    const updatedUser = await this.userRepo.update(
      { hashedRefreshToken, activationLink },
      { where: { id: newUser.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User registred',
      user: updatedUser[1][0],
      tokens,
    };

    return response;
  }

  async create(createUserDto: CreateUserDto) {
    return this.userRepo.create(createUserDto);
  }

  async findAll() {
    return this.userRepo.findAll();
  }

  async findOne(id: number) {
    return this.userRepo.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return user[1][0];
  }

  async remove(id: number) {
    const userRows = await this.userRepo.destroy({ where: { id } });
    if (userRows == 0) return 'Not found';
    return 'removed successfully';
  }
}
