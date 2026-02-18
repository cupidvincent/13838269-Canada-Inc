import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum StepType {
  SEND_EMAIL = 'SEND_EMAIL',
  WAIT = 'WAIT',
}

class StepDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsEnum(StepType)
  type: StepType;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  body?: string;

  @IsOptional()
  @IsNumber()
  seconds?: number;
}

export class CreateCadenceDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StepDto)
  steps: StepDto[];
}
