import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { PrismaService } from 'prisma/prisma.service';
import { LicenseEntity } from './entities/license.entity';
import { License } from '@prisma/client';

@Injectable()
export class LicensesService {
  constructor(private readonly prismaService: PrismaService) {}

  private mapToDomain(raw: License) {
    return new LicenseEntity(
      raw.id,
      raw.patientId,
      raw.diagnosis,
      raw.startDate,
      raw.days,
      raw.status as unknown as any,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  async create(createLicenseDto: CreateLicenseDto) {
    const license = await this.prismaService.license.create({
      data: {
        patientId: createLicenseDto.patientId,
        doctorId: createLicenseDto.doctorId,
        diagnosis: createLicenseDto.diagnosis,
        startDate: createLicenseDto.startDate,
        days: createLicenseDto.days,
        status: createLicenseDto.status,
      },
    });
    return this.mapToDomain(license);
  }

  async findAll(): Promise<LicenseEntity[]> {
    const licenses = await this.prismaService.license.findMany();
    return licenses.map((license) => this.mapToDomain(license));

  }

  async findOne(id: string): Promise<LicenseEntity> {
    const license = await this.prismaService.license.findFirst({
      where: { id },
    });
    if (!license) throw new NotFoundException('License not found');
    return this.mapToDomain(license);
  }

  async update(id: string, updateLicenseDto: UpdateLicenseDto) {
    const license = await this.findOne(id);
    const data = {
      ...license,
      ...updateLicenseDto,
    }
    const updatedLicense = await this.prismaService.license.update({
      where: { id },
      data: {
        patientId: data.patientId,
        diagnosis: data.diagnosis,
        startDate: data.startDate,
        days: data.days,
        status: data.status,
        updatedAt: new Date(),
      },
    });
    return this.mapToDomain(updatedLicense);
  }

  async remove(id: string): Promise<LicenseEntity> {
    const license = await this.findOne(id);
    await this.prismaService.license.delete({ where: { id } });
    return license;
  }
}
