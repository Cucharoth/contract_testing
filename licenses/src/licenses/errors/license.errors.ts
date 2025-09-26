export class InvalidDaysError extends Error {
  readonly details: string;
  constructor(message = 'Days must be greater than zero') {
    super(message);
    this.name = InvalidDaysError.name;
    this.details = message;
  }
}

export class LicenseNotFoundError extends Error {
  readonly details: string;
  constructor(message = 'License not found') {
    super(message);
    this.name = LicenseNotFoundError.name;
    this.details = message;
  }
}

export class LicenseInvalidError extends Error {
  readonly details: string;
  constructor(message = 'License is invalid') {
    super(message);
    this.name = LicenseInvalidError.name;
    this.details = message;
  }
}
