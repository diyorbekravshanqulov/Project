import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    type: Number,
    description: 'The ID of the user who left the comment.',
  })
  @IsNumber({}, { message: 'User ID must be a number.' })
  userId: number;

  @ApiProperty({
    type: Number,
    description: 'The ID of the stadium being commented on.',
  })
  @IsNumber({}, { message: 'Stadium ID must be a number.' })
  stadiumId: number;

  @ApiProperty({
    type: String,
    description: 'The impression or feedback about the stadium.',
  })
  @IsString({ message: 'Impression must be a string.' })
  impression: string;
}
