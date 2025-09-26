import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DoctorEntity } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<DoctorEntity> {
    return await this.prismaService.doctor.create({
      data: {
        id: "<unique_id>",
        name: createDoctorDto.name,
        lastname: createDoctorDto.lastName,
      },
    });
  }

  async findAll(): Promise<DoctorEntity[]> {
    return await this.prismaService.doctor.findMany();
  }

  async findOne(id: string): Promise<DoctorEntity> {
    const doctor = await this.prismaService.doctor.findFirst({
      where: { id },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with id ${id} not found`);
    }
    return doctor;
  }

  async update(
    id: string,
    updateDoctorDto: UpdateDoctorDto,
  ): Promise<DoctorEntity> {
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

  async remove(id: string): Promise<DoctorEntity> {
    const existing = await this.findOne(id);
    await this.prismaService.doctor.delete({
      where: { id },
    });
    return existing;
  }
}
