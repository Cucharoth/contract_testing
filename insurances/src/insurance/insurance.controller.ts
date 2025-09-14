import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { InsuranceService } from './insurance.service';


@Controller('insurer')
export class InsuranceController {
    constructor(private readonly insuranceService: InsuranceService) {
    }

    @Get("licenses/:folio/verify")
    verifyLicense(@Param('folio', ParseUUIDPipe) folio: string) {
        return this.insuranceService.verifyLicense(folio);
    }
    
    @Get("patients/:patientId/licenses")
    getPatientLicenses(@Param('patientId', ParseUUIDPipe) patientId: string) {
        return this.insuranceService.getPatientLicenses(patientId);
    }

}
