import { prisma } from '../utils/client';
import { toTimeDate } from '../utils/helper';
import {
  ICreateSessionDetailSchedule,
  IPagination,
  ISessionDetailScheduleRepository,
} from '../utils/interfaces';

export const createSessionDetailSchedule = async (
  payload: Omit<ISessionDetailScheduleRepository, 'id'>,
): Promise<ISessionDetailScheduleRepository> => {
  return await prisma.sesiJadwalTraining.create({
    data: {
      detailJadwalTrainingId: payload.detailJadwalTrainingId,
      jamMulai: payload.jamMulai,
      jamSelesai: payload.jamSelesai,
      aktivitas: payload.aktivitas,
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
      ...(payload?.jamSelesai && { jamSelesai: toTimeDate(payload.jamSelesai) }),
      ...(payload?.aktivitas && { aktivitas: payload.aktivitas }),
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
    orderBy,
  });
};

export const countSessionDetailSchedule = async (
  where: any,
): Promise<number> => {
  return await prisma.sesiJadwalTraining.count({ where });
};

export const existingSessionDetailSchedule = async (
  jamMulai: string, jamSelesai: string
): Promise<ISessionDetailScheduleRepository | null> => {
  return await prisma.sesiJadwalTraining.findFirst({
    where: { 
      jamMulai,
      jamSelesai
     },
  });
};
