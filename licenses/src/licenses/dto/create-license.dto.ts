import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateLicenseDto {
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsString()
  @IsNotEmpty()
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
