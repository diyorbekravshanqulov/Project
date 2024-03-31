import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Region } from './model/region.model';

@Module({
  imports: [SequelizeModule.forFeature([Region])], // Importing SequelizeModule to provide access to the Region model
  controllers: [RegionController], // Registering the RegionController to handle HTTP requests related to regions
  providers: [RegionService], // Registering the RegionService to handle business logic related to regions
})
export class RegionModule {} // Module responsible for managing everything related to regions in the application
