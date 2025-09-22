import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LicenseQueryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  patientId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  doctorId?: string;
}
