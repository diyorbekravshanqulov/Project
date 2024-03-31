import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './model/category.model';

/**
 * Module responsible for managing categories.
 * This module provides CRUD operations for categories.
 */
@Module({
  // Import SequelizeModule to access database functionality
  imports: [SequelizeModule.forFeature([Category])],
  // Declare the controller responsible for handling HTTP requests related to categories
  controllers: [CategoriesController],
  // Declare the service responsible for implementing business logic for categories
  providers: [CategoriesService],
})
export class CategoriesModule {}
