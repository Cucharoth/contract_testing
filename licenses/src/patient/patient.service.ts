import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PatientEntity } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    return await this.prismaService.patient.create({
      data: {
        id: "<unique_id>",
        name: createPatientDto.name,
        lastname: createPatientDto.lastName,
      },
    });
  }

  async findAll(): Promise<PatientEntity[]> {
    return await this.prismaService.patient.findMany();
  }

  async findOne(id: string) {
    const patient = await this.prismaService.patient.findFirst({
      where: { id: id.toString() },
    });
    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const prev = await this.findOne(id);
    const data = {
      ...prev,
      ...updatePatientDto,
    };
    return await this.prismaService.patient.update({
      where: { id: id.toString() },
      data,
    });
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    await this.prismaService.patient.delete({
      where: { id: id.toString() },
    });
    return existing;
  }
}
