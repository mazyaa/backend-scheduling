import { prisma } from '../utils/client';

export const getPenilaianWithJadwal = async (
  where: any,
  skip: number,
  take: number,
) => {
  return await prisma.penilaian.findMany({
    skip,
    take,
    where,
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
      jadwalTraining: {
        include: {
          training: { select: { namaTraining: true } },
          _count: { select: { pesertaTraining: true } },
        },
      },
      revisiFile: { select: { status: true } },
      sertifikat: {
        include: { materiTraining: { select: { judul: true } } },
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const countPenilaianWithJadwal = async (
  where: any,
): Promise<number> => {
  return await prisma.penilaian.count({ where });
};

export const getPesertaLaporan = async (where: any, skip: number, take: number) => {
  return await prisma.penilaian.findMany({
    skip,
    take,
    where,
    include: {
      user: {
        select: {
          name: true,
          email: true,
          noWa: true,
          profilPeserta: { select: { instansi: true } },
        },
      },
      jadwalTraining: {
        select: {
          batch: true,
          startDate: true,
          duration: true,
          training: { select: { namaTraining: true } },
        },
      },
      revisiFile: { select: { status: true } },
      sertifikat: {
        include: { materiTraining: { select: { judul: true } } },
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const countPesertaLaporan = async (where: any): Promise<number> => {
  return await prisma.penilaian.count({ where });
};
