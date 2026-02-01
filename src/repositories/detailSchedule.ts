import { prisma } from "../utils/client";
import type { ICreateDetailSchedule, IPagination, IDetailSchedule } from "../utils/interfaces";

export const createDetailSchedule = async (id: string, payload: IDetailSchedule): Promise<IDetailSchedule> => {
    return await prisma.detailJadwalTraining.update({ // use update because data is provided
        where: { id },
        data: {
            aktivitas: payload.aktivitas,
            instrukturId: payload.instrukturId,
            asesorId: payload.asesorId,
        }
    });
};

export const getDetailScheduleById = async (id: string): Promise<IDetailSchedule | null> => {
    return await prisma.detailJadwalTraining.findUnique({
        where: { id },
    });
};

export const updateDetailScheduleById = async (id: string, payload: ICreateDetailSchedule): Promise<IDetailSchedule> => {
    return await prisma.detailJadwalTraining.update({
        where: { id },
        data: {
            aktivitas: payload.aktivitas,
            instrukturId: payload.instrukturId,
            asesorId: payload.asesorId,
        }
    })
};

export const getDetailSchedule = async (payload: IPagination): Promise<IDetailSchedule[]> => {
    const { skip, take, where, orderBy } = payload;

    return await prisma.detailJadwalTraining.findMany({
        skip,
        take,
        where,
        orderBy,
    });
};

export const countDetailSchedule = async (where?: object): Promise<number> => {
    return await prisma.detailJadwalTraining.count({
        where
    });
};