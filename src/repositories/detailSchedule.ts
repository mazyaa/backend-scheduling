import { prisma } from "../utils/client";
import type { ICreateDetailSchedule, IPagination, IDetailSchedule } from "../utils/interfaces";

export const createDetailSchedule = async (id: string, payload: Omit<ICreateDetailSchedule, 'hari' | 'hariKe'>): Promise<IDetailSchedule> => {
    return await prisma.detailJadwalTraining.update({ // use update because data is provided
        where: { id },
        data: {
            ...(payload.aktivitas && { aktivitas: payload.aktivitas }),
            ...(payload.instrukturId && { instrukturId: payload.instrukturId }),
            ...(payload.asesorId && { asesorId: payload.asesorId }),
        }
    });
};

export const getDetailScheduleById = async (id: string): Promise<IDetailSchedule | null> => {
    return await prisma.detailJadwalTraining.findUnique({
        where: { id },
    });
};

export const updateDetailScheduleById = async (id: string, payload: Omit<ICreateDetailSchedule, 'hari' | 'hariKe'>): Promise<IDetailSchedule> => {
    return await prisma.detailJadwalTraining.update({
        where: { id },
        data: {
            ...(payload.aktivitas && { aktivitas: payload.aktivitas }),
            ...(payload.instrukturId && { instrukturId: payload.instrukturId }),
            ...(payload.asesorId && { asesorId: payload.asesorId }),
        }
    });
};

export const getAllDetailSchedules = async (payload: IPagination): Promise<IDetailSchedule[]> => {
    const { skip, take, where, orderBy } = payload;

    return await prisma.detailJadwalTraining.findMany({
        skip,
        take,
        where,
        include: { // use include to join with jadwalTraining and training table
            jadwalTraining: {
                include: {
                    training: true,
                }
            }
        },
        orderBy,
    });
};

export const countDetailSchedule = async (where?: object): Promise<number> => {
    return await prisma.detailJadwalTraining.count({
        where
    });
};

export const getMaxHariKe = async (jadwalTrainingId: string): Promise<number | null> => {
    const result = await prisma.detailJadwalTraining.aggregate({ // use aggregate to get max value
        _max: { hariKe: true }, // and use _max to get max value of hariKe
        where: { jadwalTrainingId },
    });
    
    return result._max.hariKe ?? null;
};