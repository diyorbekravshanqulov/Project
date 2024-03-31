import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Data Transfer Object (DTO) for creating a new category
export class CreateCategoryDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'Name of the category',
  })
  @IsNotEmpty()
  @IsString()
  name: string; // Name of the category

  @ApiProperty({
    example: 1,
    description: 'ID of the parent category',
  })
  @IsNotEmpty()
  @IsNumber()
  parentId: number; // ID of the parent category
}
