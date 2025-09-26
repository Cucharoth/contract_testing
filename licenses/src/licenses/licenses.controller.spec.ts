import { Test, TestingModule } from '@nestjs/testing';
import { LicensesController } from './licenses.controller';
import { LicensesService } from './licenses.service';
import { PrismaService } from '../../prisma/prisma.service';
import { createPrismaMock, PrismaMock } from '../../test/prisma.mock';

describe('LicensesController', () => {
  let controller: LicensesController;

  let prisma: PrismaMock;

  beforeEach(async () => {
    prisma = createPrismaMock();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicensesController],
      providers: [
        LicensesService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    controller = module.get<LicensesController>(LicensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
