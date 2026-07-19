import { prisma } from '../utils/client';
import { toTimeDate } from '../utils/helper';
import {
  ICreateSessionDetailSchedule,
  IPagination,
  ISessionDetailScheduleRepository,
} from '../utils/interfaces';


export const createManySessionDetailSchedule = async (
  payloads: Omit<ISessionDetailScheduleRepository, 'id'>[],
) => {
  return await prisma.sesiJadwalTraining.createMany({
    data: payloads.map(p => ({
      detailJadwalTrainingId: p.detailJadwalTrainingId,
      jamMulai: p.jamMulai,
      jamSelesai: p.jamSelesai,
      aktivitas: p.aktivitas,
      pic: p.pic,
    })),
  });
};

export const createSessionDetailSchedule = async (
  payload: Omit<ISessionDetailScheduleRepository, 'id'>,
): Promise<ISessionDetailScheduleRepository> => {
  return await prisma.sesiJadwalTraining.create({
    data: {
      detailJadwalTrainingId: payload.detailJadwalTrainingId,
      jamMulai: payload.jamMulai,
      jamSelesai: payload.jamSelesai,
      aktivitas: payload.aktivitas,
      pic: payload.pic,
    },
  });
};

export const getSessionDetailSchedule = async (id: string) => {
  return await prisma.sesiJadwalTraining.findUnique({ where: { id } });
};

export const updateSessionDetailSchedule = async (
  id: string,
  payload: Partial<ICreateSessionDetailSchedule>,
): Promise<ISessionDetailScheduleRepository> => {
  return await prisma.sesiJadwalTraining.update({
    where: { id },
    data: {
      ...(payload?.jamMulai && { jamMulai: toTimeDate(payload.jamMulai) }),
      ...(payload?.jamSelesai && {
        jamSelesai: toTimeDate(payload.jamSelesai),
      }),
      ...(payload?.aktivitas && { aktivitas: payload.aktivitas }),
      ...(payload?.pic && { pic: payload.pic }),
    },
  });
};

export const deleteSessionDetailSchedule = async (
  id: string,
): Promise<ISessionDetailScheduleRepository> => {
  return await prisma.sesiJadwalTraining.delete({ where: { id } });
};

export const getSessionDetailSchedules = async (
  payload: IPagination,
): Promise<ISessionDetailScheduleRepository[]> => {
  const { skip, take, where, orderBy } = payload;

  return await prisma.sesiJadwalTraining.findMany({
    skip,
    take,
    where,
    include: {
      detailJadwalTraining: {
        include: {
          instruktur: {
            select: {
              name: true,
            },
          },
          asesor: {
            select: {
              name: true,
            },
          }
        }
      }
    },
    orderBy,
  });
};

export const countSessionDetailSchedule = async (
  where: any,
): Promise<number> => {
  return await prisma.sesiJadwalTraining.count({ where });
};

export const existingSessionDetailSchedule = async (
  detailJadwalTrainingId: string,
  jamMulai: string,
  jamSelesai: string,
): Promise<ISessionDetailScheduleRepository | null> => {
  return await prisma.sesiJadwalTraining.findFirst({
    where: {
      detailJadwalTrainingId,
      jamMulai,
      jamSelesai,
    },
  });
};
