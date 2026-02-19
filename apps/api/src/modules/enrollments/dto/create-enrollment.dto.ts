import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEnrollmentDto {
  @IsNumber()
  @Type(() => Number)
  cadenceId: number;

  @IsString()
  contactEmail: string;
}

export enum StepType {
  SEND_EMAIL = 'SEND_EMAIL',
  WAIT = 'WAIT',
}
export class StepDto {
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

export class UpdateCadenceDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StepDto)
  steps: StepDto[];
}
