import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

// DTO (Data Transfer Object) for updating a comfort option
export class UpdateComfortDto {
  @ApiProperty({
    description: 'Optional: New name of the comfort option',
    example: 'Heating system',
  })
  @IsOptional()
  @IsString()
  name?: string; // Optional: New name of the comfort option
}
