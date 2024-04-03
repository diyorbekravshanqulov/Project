import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './commment.service';
import { CreateCommentDto } from './dto/create-commment.dto';
import { UpdateCommentDto } from './dto/update-commment.dto';

@Controller('commment')
export class CommmentController {
  constructor(private readonly commmentService: CommentService) {}

  @Post()
  create(@Body() createCommmentDto: CreateCommentDto) {
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
  update(@Param('id') id: string, @Body() updateCommmentDto: UpdateCommentDto) {
    return this.commmentService.update(+id, updateCommmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commmentService.remove(+id);
  }
}
