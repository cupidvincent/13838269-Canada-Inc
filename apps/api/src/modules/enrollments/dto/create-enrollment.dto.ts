import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEnrollmentDto {
  @IsNumber()
  @Type(() => Number)
  cadenceId: number;

  @IsString()
  contactEmail: string;
}
