import { Module } from '@nestjs/common';
import { LicensesModule } from './licenses/licenses.module';
import { HealthModule } from './health/health.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { DoctorModule } from './doctor/doctor.module';
import configuration from './config/environment.config';
import { PatientModule } from './patient/patient.module';
import { PactModule } from './pact/pact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
      isGlobal: true,
    }),
    PrismaModule,
    LicensesModule,
    HealthModule,
    DoctorModule,
    PatientModule,
    PactModule,
  ],
})
export class AppModule {}
