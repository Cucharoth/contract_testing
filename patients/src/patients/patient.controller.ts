import {
    Controller,
    Get,
    NotFoundException,
    Param,
    ServiceUnavailableException,
} from "@nestjs/common";
import { PatientsService } from "./patient.service";
import {
    PatientLicensesLookupError,
    PatientLicensesNotFoundError,
} from "./errors/patient.errors";

@Controller("patient")
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) {}

    @Get(":patientId/licenses")
    async getPatientLicenses(@Param("patientId") patientId: string) {
        try {
            return await this.patientsService.getPatientLicenses(patientId);
        } catch (error) {
            return this.handleError(error);
        }
    }

    private handleError(error: unknown): never {
        if (error instanceof PatientLicensesNotFoundError) {
            throw new NotFoundException(error.details);
        }
        if (error instanceof PatientLicensesLookupError) {
            throw new ServiceUnavailableException(error.message);
        }
        throw error;
    }
}
