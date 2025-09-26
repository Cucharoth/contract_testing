import {
    Controller,
    Get,
    NotFoundException,
    Param,
    ServiceUnavailableException,
} from "@nestjs/common";
import { InsuranceService } from "./insurance.service";
import {
    InsurancePatientLicensesNotFoundError,
    LicenseProviderLookupError,
    LicenseVerificationFailureError,
} from "./errors/insurance.errors";

@Controller("insurer")
export class InsuranceController {
    constructor(private readonly insuranceService: InsuranceService) {}

    @Get("licenses/:folio/verify")
    async verifyLicense(@Param("folio") folio: string) {
        try {
            return await this.insuranceService.verifyLicense(folio);
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get("patients/:patientId/licenses")
    async getPatientLicenses(@Param("patientId") patientId: string) {
        try {
            return await this.insuranceService.getPatientLicenses(patientId);
        } catch (error) {
            return this.handleError(error);
        }
    }

    private handleError(error: unknown): never {
        if (error instanceof LicenseVerificationFailureError) {
            throw new NotFoundException(error.details);
        }
        if (error instanceof InsurancePatientLicensesNotFoundError) {
            throw new NotFoundException(error.details);
        }
        if (error instanceof LicenseProviderLookupError) {
            throw new ServiceUnavailableException(error.message);
        }
        throw error;
    }
}
