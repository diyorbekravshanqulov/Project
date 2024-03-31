import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './model/district.model';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private districtRepo: typeof District) {}

  async create(createDistrictDto: CreateDistrictDto) {
    return this.districtRepo.create(createDistrictDto);
  }

  async findAll() {
    return this.districtRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.districtRepo.findByPk(id);
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    const district = await this.districtRepo.update(updateDistrictDto, {
      where: { id },
      returning: true,
    });
    return district[1][0];
  }

  async remove(id: number) {
    const districtRows = await this.districtRepo.destroy({ where: { id } });
    if (districtRows == 0) return 'Not found';
    return 'successfully removed';
  }
}
