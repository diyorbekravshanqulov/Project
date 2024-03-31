import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDistrictDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  regionId: string;
}
