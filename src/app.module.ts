// Importing required modules from Nest.js framework
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

// Importing modules related to specific features of the application
import { UsersModule } from './users/users.module';
import { ComfortModule } from './comfort/comfort.module';
import { CategoriesModule } from './categories/categories.module';
import { DistrictModule } from './district/district.module';
import { AdminModule } from './admin/admin.module';
import { RegionModule } from './region/region.module';

// Importing Sequelize models for database operations
import { Users } from './users/model/user.model';
import { Admin } from './admin/model/admin.model';
import { Category } from './categories/model/category.model';
import { Region } from './region/model/region.model';
import { District } from './district/model/district.model';
import { MailModule } from './mail/mail.module';
import { Comfort } from './comfort/model/comfort.model';
import { MediaModule } from './media/media.module';
import { ConfortStadiumModule } from './confort_stadium/confort_stadium.module';
import { StadiumsModule } from './stadiums/stadiums.module';
import { Media } from './media/model/media.model';
import { ComfortStadium } from './confort_stadium/model/confort_stadium.model';
import { Stadiums } from './stadiums/model/stadium.model';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './app.constants';
import { StadiumTimesModule } from './stadium_times/stadium_times.module';
import { CartModule } from './cart/cart.module';
import { UserWalletModule } from './user_wallet/user_wallet.module';
import { CommmentModule } from './commment/commment.module';
import { UserCartModule } from './user_cart/user_cart.module';
import { Bot } from './bot/model/bot.model';
import { StadiumTimes } from './stadium_times/model/stadium_time.model';
import { Cart } from './cart/model/cart.model';
import { UserWallet } from './user_wallet/model/user_wallet.model';
import { Comments } from './commment/model/commment.entity';
import { UserCart } from './user_cart/model/user_cart.model';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        include: [BotModule],
      }),
    }),
    // Importing configuration module to load environment variables
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),

    // Setting up Sequelize for database operations
    SequelizeModule.forRoot({
      dialect: 'postgres', // Using PostgreSQL dialect
      host: process.env.POSTGRES_HOST, // Getting host from environment variables
      port: Number(process.env.POSTGRES_PORT), // Getting port from environment variables
      username: process.env.POSTGRES_USER, // Getting username from environment variables
      password: process.env.POSTGRES_PASSWORD, // Getting password from environment variables
      database: process.env.POSTGRES_DB, // Getting database name from environment variables
      models: [
        Users,
        // Admin,
        // Category,
        // Region,
        // District,
        // Comfort,
        // Media,
        // ComfortStadium,
        // Stadiums,
        Bot,
        // StadiumTimes,
        // Cart,
        // UserWallet,
        // Comments,
        // UserCart,
      ], // Associating Sequelize models with the database
      autoLoadModels: true, // Automatically loading models from the specified paths
      sync: { alter: true }, // Synchronizing database schema with model definitions (altering tables)
      logging: true, // Enabling logging for database operations
    }),

    // Importing various modules for different functionalities
    UsersModule,
    // ComfortModule,
    // CategoriesModule,
    // DistrictModule,
    // AdminModule,
    // RegionModule,
    // MailModule,
    // MediaModule,
    // ConfortStadiumModule,
    // StadiumsModule,
    BotModule,
    OtpModule,
    // StadiumTimesModule,
    // CartModule,
    // UserWalletModule,
    // CommmentModule,
    // UserCartModule,
  ],
  controllers: [], // No controllers defined in this module
  providers: [], // No providers defined in this module
})
export class AppModule {} // Exporting AppModule class as the root module of the application
