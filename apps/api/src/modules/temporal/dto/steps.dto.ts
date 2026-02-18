import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
export enum type {
  SEND_EMAIL = 'SEND_EMAIL',
  WAIT = 'WAIT',
}

export class stepDto {
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsEnum(type)
  type: type;
  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  body?: string;

  @IsOptional()
  @IsString()
  seconds?: number;
}
