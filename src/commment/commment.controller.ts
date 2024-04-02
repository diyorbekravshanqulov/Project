import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommmentService } from './commment.service';
import { CreateCommmentDto } from './dto/create-commment.dto';
import { UpdateCommmentDto } from './dto/update-commment.dto';

@Controller('commment')
export class CommmentController {
  constructor(private readonly commmentService: CommmentService) {}

  @Post()
  create(@Body() createCommmentDto: CreateCommmentDto) {
    return this.commmentService.create(createCommmentDto);
  }

  @Get()
  findAll() {
    return this.commmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommmentDto: UpdateCommmentDto) {
    return this.commmentService.update(+id, updateCommmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commmentService.remove(+id);
  }
}
