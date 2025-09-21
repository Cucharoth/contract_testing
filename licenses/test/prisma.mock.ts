// Centralized Prisma mock for unit tests.
// Extend this as needed when new models/methods are used.
export const createPrismaMock = () => {
  const crud = () => ({
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  });

  return {
    doctor: crud(),
    patient: crud(),
    license: crud(),
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  } as const;
};

export type PrismaMock = ReturnType<typeof createPrismaMock>;
