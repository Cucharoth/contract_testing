import { Controller, Get, Param } from '@nestjs/common';
import { InsuranceService } from './insurance.service';


@Controller('insurer')
export class InsuranceController {
    constructor(private readonly insuranceService: InsuranceService) {
    }

    @Get("licenses/:folio/verify")
    verifyLicense(@Param('folio') folio: string) {
        return this.insuranceService.verifyLicense(folio);
    }
    
    @Get("patients/:patientId/licenses")
    getPatientLicenses(@Param('patientId') patientId: string) {
        return this.insuranceService.getPatientLicenses(patientId);
    }

}
