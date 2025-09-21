import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import {
    InsurancePatientLicensesNotFoundError,
    LicenseProviderLookupError,
    LicenseVerificationFailureError,
} from "./errors/insurance.errors";

@Injectable()
export class InsuranceService {
    private readonly logger = new Logger(InsuranceService.name);

    async verifyLicense(folio: string) {
        this.logger.log(`Verifying license with folio: ${folio}`);
        const licenseApiUrl =
            process.env.LICENSE_API_URL || "http://localhost:32001";

        try {
            const currentUrl = `${licenseApiUrl}/licenses/${folio}/verify`;
            const response = await axios.get(currentUrl);
            if (response.status == 200) {
                this.logger.log(
                    `Successfully verified license with folio ${folio}`,
                );
                return response.data;
            }
            this.logger.warn(
                `Failed to verify license with folio ${folio}. Status code: ${response.status}`,
            );
            throw new LicenseVerificationFailureError();
        } catch (error) {
            this.logger.error(
                `Error verifying license with folio ${folio}: ${error.message}`,
            );
            if (error instanceof LicenseVerificationFailureError) {
                throw error;
            }
            throw new LicenseProviderLookupError();
        }
    }

    async getPatientLicenses(patientId: string) {
        this.logger.log(`Fetching licenses for patient ID: ${patientId}`);

        const licenseApiUrl =
            process.env.LICENSE_API_URL || "http://localhost:32001";

        try {
            const currentUrl = `${licenseApiUrl}/licenses/?patientId=${patientId}`;
            const response = await axios.get(currentUrl);
            if (response.status == 200) {
                this.logger.log(
                    `Successfully fetched licenses for patient ID ${patientId}`,
                );
                return response.data;
            }
            this.logger.warn(
                `Failed to fetch licenses for patient ID ${patientId}. Status code: ${response.status}`,
            );
            throw new InsurancePatientLicensesNotFoundError();
        } catch (error) {
            this.logger.error(
                `Error fetching licenses for patient ID ${patientId}: ${error.message}`,
            );
            if (error instanceof InsurancePatientLicensesNotFoundError) {
                throw error;
            }
            throw new LicenseProviderLookupError();
        }
    }
}
