import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO class for creating a district
export class CreateDistrictDto {
  @ApiProperty({
    example: 'District A',
    description: 'Name of the district',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the region to which the district belongs',
  })
  @IsNotEmpty()
  @IsNumber()
  regionId: string;
}
