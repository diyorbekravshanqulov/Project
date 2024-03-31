import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './model/admin.model';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminRepo: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    return this.adminRepo.create(createAdminDto);
  }

  async findAll() {
    return this.adminRepo.findAll();
  }

  async findOne(id: number) {
    return this.adminRepo.findByPk(id);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepo.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return admin[1][0];
  }

  async remove(id: number) {
    const adminRows = await this.adminRepo.destroy({ where: { id } });
    if (adminRows == 0) return 'Not found';
    return 'successfully removed';
  }
}
