import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Region') // Tagging the controller with 'Region' for Swagger documentation
@Controller('region') // Controller route prefix
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  // Endpoint to create a new region
  @ApiOperation({ summary: 'Create a new region' }) // Swagger operation summary
  @ApiBody({ type: CreateRegionDto }) // Swagger request body definition
  @ApiResponse({
    status: 201,
    description: 'The region has been successfully created.',
  }) // Swagger response description
  @Post()
  async create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  // Endpoint to retrieve all regions
  @ApiOperation({ summary: 'Get all regions' }) // Swagger operation summary
  @ApiResponse({ status: 200, description: 'List of all regions.' }) // Swagger response description
  @Get()
  async findAll() {
    return this.regionService.findAll();
  }

  // Endpoint to retrieve a specific region by ID
  @ApiOperation({ summary: 'Get region by ID' }) // Swagger operation summary
  @ApiParam({ name: 'id', description: 'Region ID' }) // Swagger parameter description
  @ApiResponse({
    status: 200,
    description: 'The region has been successfully retrieved.',
  }) // Swagger response description
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  // Endpoint to update a specific region by ID
  @ApiOperation({ summary: 'Update region by ID' }) // Swagger operation summary
  @ApiParam({ name: 'id', description: 'Region ID' }) // Swagger parameter description
  @ApiBody({ type: UpdateRegionDto }) // Swagger request body definition
  @ApiResponse({
    status: 200,
    description: 'The region has been successfully updated.',
  }) // Swagger response description
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateRegionDto,
  ) {
    return this.regionService.update(+id, updateRegionDto);
  }

  // Endpoint to delete a specific region by ID
  @ApiOperation({ summary: 'Delete region by ID' }) // Swagger operation summary
  @ApiParam({ name: 'id', description: 'Region ID' }) // Swagger parameter description
  @ApiResponse({
    status: 200,
    description: 'The region has been successfully deleted.',
  }) // Swagger response description
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
