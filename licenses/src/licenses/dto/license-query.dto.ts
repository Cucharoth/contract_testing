import { IsOptional, IsUUID } from 'class-validator';

export class LicenseQueryDto {
  @IsOptional()
  @IsUUID()
  patientId?: string;
  @IsOptional()
  @IsUUID()
  doctorId?: string;
}
