import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateLicenseDto {
  @IsUUID()
  patientId: string;
  @IsUUID()
  doctorId: string;

  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @Min(1)
  days: number;
}
