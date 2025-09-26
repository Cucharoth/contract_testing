import { Module } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { LicensesController } from './licenses.controller';
import { FolioGeneratorService } from './folio-generator.service';
import { PatientModule } from '../patient/patient.module';
import { DoctorModule } from '../doctor/doctor.module';

@Module({
  imports: [PatientModule, DoctorModule],
  controllers: [LicensesController],
  providers: [LicensesService, FolioGeneratorService],
})
export class LicensesModule {}
