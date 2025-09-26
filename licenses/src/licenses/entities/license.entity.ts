import { LicenseStatusEnum } from '../enum/license-status.enum';

export class LicenseEntity {
  constructor(
    public readonly id: string,
    public readonly patientId: string,
    public readonly doctorId: string,
    public readonly diagnosis: string,
    public readonly startDate: Date,
    public readonly days: number,
    public readonly status: LicenseStatusEnum,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
