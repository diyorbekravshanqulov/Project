import { Module } from '@nestjs/common';
import { ComfortService } from './comfort.service';
import { ComfortController } from './comfort.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comfort } from './model/comfort.model';

@Module({
  imports: [SequelizeModule.forFeature([Comfort])], // Importing the Comfort model into the module
  controllers: [ComfortController], // Declaring the ComfortController as a controller for this module
  providers: [ComfortService], // Providing the ComfortService as a dependency within this module
})
export class ComfortModule {}
