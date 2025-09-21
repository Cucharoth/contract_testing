export class LicenseVerificationFailureError extends Error {
    constructor(
        public readonly details: Record<string, unknown> = { valid: false },
    ) {
        super("LICENSE_VERIFICATION_FAILED");
    }
}

export class InsurancePatientLicensesNotFoundError extends Error {
    constructor(
        public readonly details: Record<string, unknown> = { error: "NOT_FOUND" },
    ) {
        super("INSURANCE_PATIENT_LICENSES_NOT_FOUND");
    }
}

export class LicenseProviderLookupError extends Error {
    constructor(message = "Unable to reach license provider") {
        super(message);
        this.name = "LicenseProviderLookupError";
    }
}
