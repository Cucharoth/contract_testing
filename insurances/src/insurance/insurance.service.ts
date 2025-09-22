import { Injectable, Logger } from "@nestjs/common";
import axios, { AxiosResponse } from "axios";
import {
    LicenseProviderLookupError,
    LicenseVerificationFailureError,
} from "./errors/insurance.errors";

@Injectable()
export class InsuranceService {
    private readonly logger = new Logger(InsuranceService.name);

    async verifyLicense(folio: string): Promise<unknown> {
        this.logger.log(`Verifying license with folio: ${folio}`);
        const licenseApiUrl =
            process.env.LICENSE_API_URL || "http://localhost:32001";

        try {
            const currentUrl = `${licenseApiUrl}/licenses/${folio}/verify`;
            const response: AxiosResponse<unknown> =
                await axios.get(currentUrl);

            this.logger.log(
                `Successfully verified license with folio ${folio}`,
            );

            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                if (status === 404) {
                    this.logger.warn(
                        `License ${folio} missing during verification; propagating provider response`,
                    );

                    const rawData: unknown = error.response?.data;
                    const details: Record<string, unknown> = rawData
                        ? (rawData as Record<string, unknown>)
                        : { valid: false };

                    throw new LicenseVerificationFailureError(details);
                }

                this.logger.error(
                    `Upstream error verifying license ${folio}: ${error.message}`,
                );
            }

            throw new LicenseProviderLookupError();
        }
    }

    async getPatientLicenses(patientId: string): Promise<unknown> {
        this.logger.log(`Fetching licenses for patient ID: ${patientId}`);

        const licenseApiUrl =
            process.env.LICENSE_API_URL || "http://localhost:32001";

        try {
            const currentUrl = `${licenseApiUrl}/licenses/?patientId=${patientId}`;
            const response: AxiosResponse<unknown> =
                await axios.get(currentUrl);

            this.logger.log(
                `Successfully fetched licenses for patient ID ${patientId}`,
            );

            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                if (status === 404) {
                    this.logger.warn(
                        `No licenses found for patient ID ${patientId}; returning empty array`,
                    );
                    return [];
                }

                this.logger.error(
                    `Upstream error fetching licenses for patient ID ${patientId}: ${error.message}`,
                );
            } else if (error instanceof Error) {
                this.logger.error(
                    `Unexpected error fetching licenses for patient ID ${patientId}: ${error.message}`,
                );
            }

            throw new LicenseProviderLookupError();
        }
    }
}
