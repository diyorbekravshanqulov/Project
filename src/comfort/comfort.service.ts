import { Injectable } from '@nestjs/common';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comfort } from './model/comfort.model';

@Injectable()
export class ComfortService {
  constructor(@InjectModel(Comfort) private comfortRepo: typeof Comfort) {}

  // Method to create a new comfort option
  async create(createComfortDto: CreateComfortDto) {
    return this.comfortRepo.create(createComfortDto);
  }

  // Method to retrieve all comfort options
  async findAll() {
    return this.comfortRepo.findAll();
  }

  // Method to retrieve a specific comfort option by ID
  async findOne(id: number) {
    return this.comfortRepo.findByPk(id);
  }

  // Method to update a specific comfort option by ID
  async update(id: number, updateComfortDto: UpdateComfortDto) {
    const comfort = await this.comfortRepo.update(updateComfortDto, {
      where: { id },
      returning: true,
    });
    return comfort[1][0];
  }

  // Method to remove a specific comfort option by ID
  async remove(id: number) {
    const comfortRows = await this.comfortRepo.destroy({ where: { id } });
    if (comfortRows == 0) return 'Not found';
    return 'successfully removed';
  }
}
