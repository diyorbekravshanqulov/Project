import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO (Data Transfer Object) for creating a new region
export class CreateRegionDto {
  // Required field for the name of the region with string validation
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Name of the region',
  })
  name: string;
}
