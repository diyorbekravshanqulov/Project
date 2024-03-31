import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Data Transfer Object (DTO) for updating a category
export class UpdateCategoryDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'Updated name of the category',
  })
  @IsOptional()
  @IsString()
  name?: string; // Updated name of the category

  @ApiProperty({
    example: 1,
    description: 'Updated ID of the parent category',
  })
  @IsOptional()
  @IsNumber()
  parentId?: number; // Updated ID of the parent category
}
