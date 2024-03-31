import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComfortService } from './comfort.service';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';

@Controller('comfort')
export class ComfortController {
  constructor(private readonly comfortService: ComfortService) {}

  @Post()
  async create(@Body() createComfortDto: CreateComfortDto) {
    return this.comfortService.create(createComfortDto);
  }

  @Get()
  async findAll() {
    return this.comfortService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.comfortService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateComfortDto: UpdateComfortDto) {
    return this.comfortService.update(+id, updateComfortDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.comfortService.remove(+id);
  }
}
