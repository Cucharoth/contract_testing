import { PartialType } from '@nestjs/mapped-types';
import { CreateLicenseDto } from './create-license.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { LicenseStatusEnum } from '../enum/license-status.enum';

export class UpdateLicenseDto extends PartialType(CreateLicenseDto) {
  @IsEnum(LicenseStatusEnum)
  @IsOptional()
  status?: LicenseStatusEnum;
}
