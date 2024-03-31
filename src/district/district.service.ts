import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './model/district.model';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private districtRepo: typeof District) {}

  /**
   * Creates a new district.
   * @param createDistrictDto The data to create a new district.
   * @returns The newly created district.
   */
  async create(createDistrictDto: CreateDistrictDto) {
    return this.districtRepo.create(createDistrictDto);
  }

  /**
   * Retrieves all districts.
   * @returns A list of all districts.
   */
  async findAll() {
    return this.districtRepo.findAll({ include: { all: true } });
  }

  /**
   * Retrieves a specific district by ID.
   * @param id The ID of the district to retrieve.
   * @returns The district with the specified ID.
   */
  async findOne(id: number) {
    return this.districtRepo.findByPk(id);
  }

  /**
   * Updates a specific district by ID.
   * @param id The ID of the district to update.
   * @param updateDistrictDto The data to update the district.
   * @returns The updated district.
   */
  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    const district = await this.districtRepo.update(updateDistrictDto, {
      where: { id },
      returning: true,
    });
    return district[1][0];
  }

  /**
   * Removes a specific district by ID.
   * @param id The ID of the district to remove.
   * @returns A message indicating the success of the operation.
   */
  async remove(id: number) {
    const districtRows = await this.districtRepo.destroy({ where: { id } });
    if (districtRows == 0) return 'Not found';
    return 'successfully removed';
  }
}
