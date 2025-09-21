import { Controller, Get, Param } from '@nestjs/common';
import { PatientsService } from './patient.service';

@Controller('patient')
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) {
    }

    @Get(":patientId/licenses")
    getPatientLicenses(@Param('patientId') patientId: string) {
        return this.patientsService.getPatientLicenses(patientId);
    }

}
