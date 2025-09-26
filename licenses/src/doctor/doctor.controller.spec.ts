import { Test, TestingModule } from '@nestjs/testing';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { PrismaService } from '../../prisma/prisma.service';
import { createPrismaMock, PrismaMock } from '../../test/prisma.mock';

describe('DoctorController', () => {
  let controller: DoctorController;

  let prisma: PrismaMock;

  beforeEach(async () => {
    prisma = createPrismaMock();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [
        DoctorService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    controller = module.get<DoctorController>(DoctorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
