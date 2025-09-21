export class PatientLicensesNotFoundError extends Error {
    constructor(
        public readonly details: Record<string, unknown> = {
            error: "NOT_FOUND",
        },
    ) {
        super("PATIENT_LICENSES_NOT_FOUND");
    }
}

export class PatientLicensesLookupError extends Error {
    constructor(message = "Failed to retrieve patient licenses") {
        super(message);
        this.name = "PatientLicensesLookupError";
    }
}
