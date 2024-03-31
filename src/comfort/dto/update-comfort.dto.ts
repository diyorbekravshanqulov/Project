import { IsOptional, IsString } from 'class-validator';

export class UpdateComfortDto {
  @IsOptional()
  @IsString()
  name?: string;
}
