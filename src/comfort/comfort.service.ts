import { Injectable } from '@nestjs/common';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comfort } from './model/comfort.model';

@Injectable()
export class ComfortService {
  constructor(@InjectModel(Comfort) private comfortRepo: typeof Comfort) {}

  async create(createComfortDto: CreateComfortDto) {
    return this.comfortRepo.create(createComfortDto);
  }

  async findAll() {
    return this.comfortRepo.findAll();
  }

  async findOne(id: number) {
    return this.comfortRepo.findByPk(id);
  }

  async update(id: number, updateComfortDto: UpdateComfortDto) {
    const comfort = await this.comfortRepo.update(updateComfortDto, {
      where: { id },
      returning: true,
    });
    return comfort[1][0];
  }

  async remove(id: number) {
    const comfortRows = await this.comfortRepo.destroy({ where: { id } });
    if (comfortRows == 0) return 'Not found';
    return 'successfully removed';
  }
}
