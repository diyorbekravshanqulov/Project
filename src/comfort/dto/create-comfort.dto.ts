import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

// DTO (Data Transfer Object) for creating a new comfort option
export class CreateComfortDto {
  @ApiProperty({
    description: 'Name of the comfort option',
    example: 'Air conditioning',
  })
  @IsNotEmpty()
  @IsString()
  name: string; // Name of the comfort option
}
