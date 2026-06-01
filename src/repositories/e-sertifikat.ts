import { prisma } from '../utils/client';
import { IPagination } from '../utils/interfaces';
import { Prisma } from '@prisma/client';

export const checkSertifikatExists = async (
  penilaianId: string,
): Promise<boolean> => {
  const count = await prisma.sertifikat.count({
    where: {
      penilaianId,
    },
  });
  return count > 0;
};

export const countSertifikatThisYear = async (
  year: number,
): Promise<number> => {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year + 1, 0, 1);

  return await prisma.sertifikat.count({
    where: {
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
  });
};

export const createSertifikatBatch = async (
  data: Prisma.SertifikatCreateManyInput[],
): Promise<Prisma.BatchPayload> => {
  return await prisma.sertifikat.createMany({
    data,
  });
};

export const getSertifikatByPenilaianId = async (penilaianId: string) => {
  return await prisma.sertifikat.findMany({
    where: {
      penilaianId,
    },
    include: {
      materiTraining: true,
    },
  });
};

export const getAllPeserta = async (payload: IPagination) => {
  const { skip, take, where, orderBy } = payload;

  return await prisma.pesertaTraining.findMany({
    skip,
    take,
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      jadwalTraining: {
        include: {
          training: {
            select: {
              namaTraining: true,
            },
          },
          penilaian: {
            select: {
              id: true,
              statusKompetensi: true,
              revisiFile: {
                select: {
                  fileRevisiAdmin: true,
                },
              },
              sertifikat: {
                select: {
                  fileSertifikat: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy,
  });
};

export const countPeserta = async (where?: object): Promise<number> => {
  return await prisma.pesertaTraining.count({ where });
};

export const getAllSertifikat = async (
  skip: number,
  take: number,
  search?: string,
) => {
  const where: any = {
    sertifikat: {
      some: {},
    },
  };

  if (search?.trim()) {
    where.user = {
      name: { contains: search.trim(), mode: 'insensitive' },
    };
  }

  return await prisma.penilaian.findMany({
    skip,
    take,
    where,
    include: {
      user: {
        select: { name: true, email: true },
      },
      jadwalTraining: {
        include: {
          training: { select: { namaTraining: true } },
        },
      },
      revisiFile: {
        select: {
          fileRevisiAdmin: true,
        },
      },
      sertifikat: {
        select: {
          id: true,
          fileSertifikat: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const countAllSertifikat = async (search?: string): Promise<number> => {
  const where: any = {
    sertifikat: {
      some: {},
    },
  };

  if (search?.trim()) {
    where.user = {
      name: { contains: search.trim(), mode: 'insensitive' },
    };
  }

  return await prisma.penilaian.count({
    where,
  });
};
