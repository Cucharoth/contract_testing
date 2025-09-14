import { LicenseStatusEnum } from '../enum/license-status.enum';

export class CreateLicenseDto {
  patientId: string;
  doctorId: string;
  diagnosis: string;
  startDate: Date;
  days: number;
  status: LicenseStatusEnum;
}
