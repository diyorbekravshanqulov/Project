import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './model/user.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    // Imports SequelizeModule to provide Sequelize functionality and register the 'Users' model
    SequelizeModule.forFeature([Users]),
    // Imports JwtModule to provide JWT functionality for user authentication
    JwtModule.register({}),
    // Imports MailModule to provide MailModule for send email
    MailModule,
  ],
  // Declares UsersController to define HTTP endpoints related to user management
  controllers: [UsersController],
  // Declares UsersService to provide business logic for user-related operations
  providers: [UsersService],
})
export class UsersModule {} // Exports UsersModule class as a feature module for user management
