export class DoctorEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly lastname: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
