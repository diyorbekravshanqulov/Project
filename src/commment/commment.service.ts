import { Injectable } from '@nestjs/common';
import { CreateCommmentDto } from './dto/create-commment.dto';
import { UpdateCommmentDto } from './dto/update-commment.dto';

@Injectable()
export class CommmentService {
  create(createCommmentDto: CreateCommmentDto) {
    return 'This action adds a new commment';
  }

  findAll() {
    return `This action returns all commment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commment`;
  }

  update(id: number, updateCommmentDto: UpdateCommmentDto) {
    return `This action updates a #${id} commment`;
  }

  remove(id: number) {
    return `This action removes a #${id} commment`;
  }
}
