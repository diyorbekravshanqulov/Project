import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './model/region.model';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private regionRepo: typeof Region) {}

  // Method to create a new region
  async create(createRegionDto: CreateRegionDto) {
    return this.regionRepo.create(createRegionDto);
  }

  // Method to retrieve all regions
  async findAll() {
    return this.regionRepo.findAll();
  }

  // Method to retrieve a specific region by ID
  async findOne(id: number) {
    return this.regionRepo.findByPk(id);
  }

  // Method to update a specific region by ID
  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.regionRepo.update(updateRegionDto, {
      where: { id },
      returning: true,
    });
    return region[1][0];
  }

  // Method to remove a specific region by ID
  async remove(id: number) {
    const regionRows = await this.regionRepo.destroy({ where: { id } });
    if (regionRows == 0) return 'Not found';
    return 'successfully removed';
  }
}
