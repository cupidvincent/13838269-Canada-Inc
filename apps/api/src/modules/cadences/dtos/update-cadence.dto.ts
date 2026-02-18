import { CreateCadenceDto } from './create-cadence.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateCadenceDto extends PartialType(CreateCadenceDto) {}
