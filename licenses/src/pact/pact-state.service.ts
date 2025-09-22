import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

type PactStateHandler = (params?: Record<string, unknown>) => Promise<void>;

@Injectable()
export class PactStateService {
  private readonly logger = new Logger(PactStateService.name);

  constructor(private readonly prisma: PrismaService) {}

  private readonly handlers: Record<string, PactStateHandler> = {
    'patient 11111111-1 has issued license folio L-1001': () =>
      this.ensurePatientHasIssuedLicense(),
    'no licenses for patient 22222222-2': () =>
      this.ensureNoLicensesForPatient('22222222-2'),
    'license L-404 does not exist': () => this.removeLicenseIfExists('L-404'),
    'issued license days>0 is creatable': () =>
      this.ensureCreatableDependencies(),
  };

  async apply(state: string, params?: Record<string, unknown>) {
    const handler = this.handlers[state];
    if (!handler) {
      this.logger.error(`Unknown Pact state requested: ${state}`);
      throw new Error(`Unknown Pact state: ${state}`);
    }

    this.logger.debug(`Applying Pact state: ${state}`);
    await handler(params);
  }

  private async ensurePatientHasIssuedLicense() {
    const patientId = '11111111-1';
    const doctorId = 'DOC-1001';
    const licenseId = 'L-1001';
    const startDate = new Date('2024-01-01T00:00:00Z');

    await this.prisma.$transaction([
      this.prisma.patient.upsert({
        where: { id: patientId },
        update: {
          name: 'Juana',
          lastname: 'Perez',
          updatedAt: new Date(),
        },
        create: {
          id: patientId,
          name: 'Juana',
          lastname: 'Perez',
        },
      }),
      this.prisma.doctor.upsert({
        where: { id: doctorId },
        update: {
          name: 'Dr. Carlos',
          lastname: 'Soto',
          updatedAt: new Date(),
        },
        create: {
          id: doctorId,
          name: 'Dr. Carlos',
          lastname: 'Soto',
        },
      }),
    ]);

    await this.prisma.license.upsert({
      where: { id: licenseId },
      update: {
        patientId,
        doctorId,
        diagnosis: 'Rest and hydration',
        startDate,
        days: 7,
        status: 'issued',
        updatedAt: new Date(),
      },
      create: {
        id: licenseId,
        patientId,
        doctorId,
        diagnosis: 'Rest and hydration',
        startDate,
        days: 7,
        status: 'issued',
      },
    });
  }

  private async ensureNoLicensesForPatient(patientId: string) {
    await this.prisma.patient.upsert({
      where: { id: patientId },
      update: {
        name: 'Paciente sin licencias',
        lastname: 'Control',
        updatedAt: new Date(),
      },
      create: {
        id: patientId,
        name: 'Paciente sin licencias',
        lastname: 'Control',
      },
    });

    await this.prisma.license.deleteMany({ where: { patientId } });
  }

  private async removeLicenseIfExists(licenseId: string) {
    await this.prisma.license.deleteMany({ where: { id: licenseId } });
  }

  private async ensureCreatableDependencies() {
    const patientId = 'PAT-POST-OK';
    const doctorId = 'DOC-POST-OK';

    await this.prisma.$transaction([
      this.prisma.patient.upsert({
        where: { id: patientId },
        update: {
          name: 'Paciente Creable',
          lastname: 'Contrato',
          updatedAt: new Date(),
        },
        create: {
          id: patientId,
          name: 'Paciente Creable',
          lastname: 'Contrato',
        },
      }),
      this.prisma.doctor.upsert({
        where: { id: doctorId },
        update: {
          name: 'Dra. Contrato',
          lastname: 'Pruebas',
          updatedAt: new Date(),
        },
        create: {
          id: doctorId,
          name: 'Dra. Contrato',
          lastname: 'Pruebas',
        },
      }),
    ]);
  }
}
