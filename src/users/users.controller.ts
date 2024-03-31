import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Users } from './model/user.model';

@ApiTags('Users') // Tags the controller with 'Users' for Swagger documentation
@Controller('users') // Defines the base route for this controller
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint for user registration
  @ApiOperation({ summary: 'Register a new user' }) // Description for Swagger documentation
  @ApiResponse({ status: 201, type: Users }) // Response definition for Swagger documentation
  @Post('signup') // Defines HTTP POST method and endpoint route
  registration(
    @Body() createUserDto: CreateUserDto, // Request body containing user data
    @Res({ passthrough: true }) res: Response, // Express Response object for setting cookies
  ) {
    return this.usersService.registration(createUserDto, res); // Calls the registration method from the service
  }

  // Endpoint for creating a new user
  @Post() // Defines HTTP POST method and endpoint route
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto); // Calls the create method from the service
  }

  // Endpoint for retrieving all users
  @Get() // Defines HTTP GET method and endpoint route
  async findAll() {
    return this.usersService.findAll(); // Calls the findAll method from the service
  }

  // Endpoint for retrieving a user by ID
  @Get(':id') // Defines HTTP GET method and endpoint route with a parameter
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id); // Calls the findOne method from the service
  }

  // Endpoint for updating a user by ID
  @Patch(':id') // Defines HTTP PATCH method and endpoint route with a parameter
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto); // Calls the update method from the service
  }

  // Endpoint for deleting a user by ID
  @Delete(':id') // Defines HTTP DELETE method and endpoint route with a parameter
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id); // Calls the remove method from the service
  }
}
