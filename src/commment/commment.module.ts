import { Module } from '@nestjs/common';
import { CommentService } from './commment.service';
import { CommmentController } from './commment.controller';

@Module({
  controllers: [CommmentController],
  providers: [CommentService],
})
export class CommmentModule {}
