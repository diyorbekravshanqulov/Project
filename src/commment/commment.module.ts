import { Module } from '@nestjs/common';
import { CommmentService } from './commment.service';
import { CommmentController } from './commment.controller';

@Module({
  controllers: [CommmentController],
  providers: [CommmentService],
})
export class CommmentModule {}
