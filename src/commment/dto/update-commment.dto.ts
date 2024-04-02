import { PartialType } from '@nestjs/swagger';
import { CreateCommmentDto } from './create-commment.dto';

export class UpdateCommmentDto extends PartialType(CreateCommmentDto) {}
