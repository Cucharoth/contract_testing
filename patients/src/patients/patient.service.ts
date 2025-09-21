import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import {
    PatientLicensesLookupError,
    PatientLicensesNotFoundError,
} from "./errors/patient.errors";

@Injectable()
export class PatientsService {
    private readonly logger = new Logger(PatientsService.name);

    async getPatientLicenses(patientId: string) {
        const licenseApiUrl =
            process.env.LICENSE_API_URL || "http://localhost:32001";
        const currentUrl = `${licenseApiUrl}/licenses/?patientId=${patientId}`;

        this.logger.log(`Fetching licenses from URL: ${currentUrl}`);
        try {
            const response = await axios.get(currentUrl);
            if (response.status == 200) {
                this.logger.log(
                    `Successfully fetched licenses for patient ${patientId}`,
                );
                return response.data;
            }
            this.logger.warn(
                `Failed to fetch licenses for patient ${patientId}. Status code: ${response.status}`,
            );
            throw new PatientLicensesNotFoundError();
        } catch (error) {
            this.logger.error(
                `Error fetching licenses for patient ${patientId}: ${error.message}`,
            );
            if (error instanceof PatientLicensesNotFoundError) {
                throw error;
            }
            throw new PatientLicensesLookupError();
        }
    }
}
