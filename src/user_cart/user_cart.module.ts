import { Module } from '@nestjs/common';
import { UserCartService } from './user_cart.service';
import { UserCartController } from './user_cart.controller';

@Module({
  controllers: [UserCartController],
  providers: [UserCartService],
})
export class UserCartModule {}
