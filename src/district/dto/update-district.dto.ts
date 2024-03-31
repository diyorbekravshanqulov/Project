import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO class for updating a district
export class UpdateDistrictDto {
  @ApiProperty({
    example: 'District A',
    description: 'Updated name of the district',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Updated ID of the region to which the district belongs',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  regionId: string;
}
