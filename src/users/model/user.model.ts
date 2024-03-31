import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IUserCreationAttr {
  fullName: string;
  hashedPassword: string;
  tgLink: string;
  email: string;
  phone: string;
  photo: string;
}

@Table({ tableName: 'users' })
export class Users extends Model<Users, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "User's unique ID",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
  })
  @Column({
    type: DataType.STRING,
  })
  fullName: string;

  @ApiProperty({
    example: 'hashed_password',
    description: 'Hashed password of the user',
  })
  @Column({
    type: DataType.STRING,
  })
  hashedPassword: string;

  @ApiProperty({
    example: 'https://t.me/user123',
    description: 'Telegram link of the user',
  })
  @Column({
    type: DataType.STRING,
  })
  tgLink: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email address of the user',
  })
  @Column({
    type: DataType.STRING,
    // unique: true,
  })
  email: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the user',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: 'https://example.com/user123.jpg',
    description: "URL of the user's photo",
  })
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the user is an owner',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isOwner: boolean;

  @ApiProperty({
    example: true,
    description: 'Indicates if the user is active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isActive: boolean;

  @ApiProperty({
    example: 'hashed_refresh_token',
    description: 'Hashed refresh token of the user',
  })
  @Column({
    type: DataType.STRING,
  })
  hashedRefreshToken: string;

  activationLink: string
}

