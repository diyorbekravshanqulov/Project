import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('District') // Tagging the controller with 'District' for Swagger documentation
@Controller('district') // Controller route prefix
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  // Endpoint to create a new district
  @ApiOperation({ summary: 'Create a new district' }) // Swagger operation summary
  @ApiBody({ type: CreateDistrictDto }) // Swagger request body definition
  @ApiResponse({ status: 201, description: 'The district has been successfully created.' }) // Swagger response description
  @Post()
  async create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  // Endpoint to retrieve all districts
  @ApiOperation({ summary: 'Get all districts' }) // Swagger operation summary
  @ApiResponse({ status: 200, description: 'List of all districts.' }) // Swagger response description
  @Get()
  async findAll() {
    return this.districtService.findAll();
  }

  // Endpoint to retrieve a specific district by ID
  @ApiOperation({ summary: 'Get district by ID' }) // Swagger operation summary
  @ApiParam({ name: 'id', description: 'District ID' }) // Swagger parameter description
  @ApiResponse({ status: 200, description: 'The district has been successfully retrieved.' }) // Swagger response description
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.districtService.findOne(+id);
  }

  // Endpoint to update a specific district by ID
  @ApiOperation({ summary: 'Update district by ID' }) // Swagger operation summary
  @ApiParam({ name: 'id', description: 'District ID' }) // Swagger parameter description
  @ApiBody({ type: UpdateDistrictDto }) // Swagger request body definition
  @ApiResponse({ status: 200, description: 'The district has been successfully updated.' }) // Swagger response description
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDistrictDto: UpdateDistrictDto) {
    return this.districtService.update(+id, updateDistrictDto);
  }

  // Endpoint to delete a specific district by ID
  @ApiOperation({ summary: 'Delete district by ID' }) // Swagger operation summary
  @ApiParam({ name: 'id', description: 'District ID' }) // Swagger parameter description
  @ApiResponse({ status: 200, description: 'The district has been successfully deleted.' }) // Swagger response description
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.districtService.remove(+id);
  }
}
