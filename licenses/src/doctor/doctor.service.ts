import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DoctorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDoctorDto: CreateDoctorDto) {
    return await this.prismaService.doctor.create({
      data: {
        name: createDoctorDto.name,
        lastname: createDoctorDto.lastName,
      }
    });
  }

  async findAll() {
    return await this.prismaService.doctor.findMany();
  }

  async findOne(id: string) {
    const doctor = await this.prismaService.doctor.findFirst({
      where: { id },
    });
    return doctor;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    const prev = await this.findOne(id);
    const data = {
      ...prev,
      ...updateDoctorDto,
    };
    return await this.prismaService.doctor.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    await this.prismaService.doctor.delete({
      where: { id },
    });
    return existing;
  }
}
