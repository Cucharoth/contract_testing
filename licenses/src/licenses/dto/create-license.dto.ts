import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { LicenseStatusEnum } from '../enum/license-status.enum';

export class CreateLicenseDto {
  @IsUUID()
  patientId: string;
  @IsUUID()
  doctorId: string;

  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @Min(1)
  days: number;

  @IsEnum(LicenseStatusEnum)
  status: LicenseStatusEnum;
}
