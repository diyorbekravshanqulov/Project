import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { Users } from './users/model/user.model';
import { ComfortModule } from './comfort/comfort.module';
import { CategoriesModule } from './categories/categories.module';
import { DistrictModule } from './district/district.module';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/model/admin.model';
import { Category } from './categories/model/category.model';
import { RegionModule } from './region/region.module';
import { Region } from './region/model/region.model';
import { District } from './district/model/district.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Users, Admin, Category, Region, District],
      autoLoadModels: true,
      sync: { alter: true },
      logging: true,
    }),
    UsersModule,
    ComfortModule,
    CategoriesModule,
    DistrictModule,
    AdminModule,
    RegionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
