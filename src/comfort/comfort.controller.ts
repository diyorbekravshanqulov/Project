import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComfortService } from './comfort.service';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Comfort') // Swagger tag for the ComfortController
@Controller('comfort')
export class ComfortController {
  constructor(private readonly comfortService: ComfortService) {}

  @ApiOperation({ summary: 'Create a new comfort option' }) // Swagger operation summary
  @ApiBody({ type: CreateComfortDto }) // Swagger request body definition
  @ApiResponse({
    status: 201,
    description: 'The comfort option has been successfully created',
  }) // Swagger response for successful creation
  @Post()
  async create(@Body() createComfortDto: CreateComfortDto) {
    return this.comfortService.create(createComfortDto);
  }

  @ApiOperation({ summary: 'Get all comfort options' }) // Swagger operation summary
  @ApiResponse({ status: 200, description: 'Returns all comfort options' }) // Swagger response for successful retrieval
  @Get()
  async findAll() {
    return this.comfortService.findAll();
  }

  @ApiOperation({ summary: 'Get a single comfort option by ID' }) // Swagger operation summary
  @ApiParam({ name: 'id', description: 'Comfort option ID' }) // Swagger parameter definition
  @ApiResponse({
    status: 200,
    description: 'Returns the comfort option with the specified ID',
  }) // Swagger response for successful retrieval
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.comfortService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a comfort option by ID' }) // Swagger operation summary
  @ApiParam({ name: 'id', description: 'Comfort option ID' }) // Swagger parameter definition
  @ApiBody({ type: UpdateComfortDto }) // Swagger request body definition
  @ApiResponse({
    status: 200,
    description: 'Returns the updated comfort option',
  }) // Swagger response for successful update
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateComfortDto: UpdateComfortDto,
  ) {
    return this.comfortService.update(+id, updateComfortDto);
  }

  @ApiOperation({ summary: 'Delete a comfort option by ID' }) // Swagger operation summary
  @ApiParam({ name: 'id', description: 'Comfort option ID' }) // Swagger parameter definition
  @ApiResponse({
    status: 200,
    description: 'The comfort option has been successfully deleted',
  }) // Swagger response for successful deletion
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.comfortService.remove(+id);
  }
}
