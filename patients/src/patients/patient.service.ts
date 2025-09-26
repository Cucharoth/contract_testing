import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { PatientLicensesLookupError } from "./errors/patient.errors";

@Injectable()
export class PatientsService {
    private readonly logger = new Logger(PatientsService.name);

    async getPatientLicenses(patientId: string): Promise<unknown> {
        const licenseApiUrl =
            process.env.LICENSE_API_URL || "http://localhost:32001";
        const currentUrl = `${licenseApiUrl}/licenses/?patientId=${patientId}`;

        this.logger.log(`Fetching licenses from URL: ${currentUrl}`);
        try {
            const response = await axios.get(currentUrl);

            this.logger.log(
                `Successfully fetched licenses for patient ${patientId}`,
            );

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                if (status === 404) {
                    this.logger.warn(
                        `No licenses found for patient ${patientId}; returning empty array`,
                    );
                    return [];
                }

                this.logger.error(
                    `Upstream error fetching licenses for patient ${patientId}: ${error.message}`,
                );
            }

            throw new PatientLicensesLookupError();
        }
    }
}
