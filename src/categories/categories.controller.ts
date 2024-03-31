import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('Categories') // Decorate the controller with ApiTags for Swagger documentation
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Endpoint to create a new category
  @ApiOperation({ summary: 'Create a new category' }) // Provide operation summary for Swagger
  @ApiResponse({ status: 201, description: 'Category created successfully' }) // Define response for Swagger
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  // Endpoint to retrieve all categories
  @ApiOperation({ summary: 'Get all categories' }) // Provide operation summary for Swagger
  @ApiResponse({
    status: 200,
    description: 'List of all categories retrieved successfully',
  }) // Define response for Swagger
  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  // Endpoint to retrieve a specific category by ID
  @ApiOperation({ summary: 'Get category by ID' }) // Provide operation summary for Swagger
  @ApiResponse({ status: 200, description: 'Category retrieved successfully' }) // Define response for Swagger
  @ApiParam({ name: 'id', description: 'Category ID', type: 'integer' }) // Define parameter for Swagger
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  // Endpoint to update a specific category by ID
  @ApiOperation({ summary: 'Update category by ID' }) // Provide operation summary for Swagger
  @ApiResponse({ status: 200, description: 'Category updated successfully' }) // Define response for Swagger
  @ApiParam({ name: 'id', description: 'Category ID', type: 'integer' }) // Define parameter for Swagger
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  // Endpoint to delete a specific category by ID
  @ApiOperation({ summary: 'Delete category by ID' }) // Provide operation summary for Swagger
  @ApiResponse({ status: 200, description: 'Category deleted successfully' }) // Define response for Swagger
  @ApiParam({ name: 'id', description: 'Category ID', type: 'integer' }) // Define parameter for Swagger
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
