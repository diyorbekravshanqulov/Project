import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

// DTO (Data Transfer Object) for updating a region
export class UpdateRegionDto {
  // Optional field for the name of the region with string validation
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Updated name of the region (optional)',
  })
  name: string;
}
