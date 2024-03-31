import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { District } from './model/district.model';

@Module({
  imports: [SequelizeModule.forFeature([District])], // Importing SequelizeModule to provide access to the District model
  controllers: [DistrictController], // Registering the DistrictController to handle HTTP requests related to districts
  providers: [DistrictService], // Registering the DistrictService to handle business logic related to districts
})
export class DistrictModule {} // Module responsible for managing everything related to districts in the application
