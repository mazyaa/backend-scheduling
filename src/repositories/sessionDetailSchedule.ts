import { prisma } from "../utils/client";
import { ICreateSessionDetailTraining, IPagination, ISessionDetailTraining } from "../utils/interfaces";

export const createSessionDetailSchedule = async (payload: ICreateSessionDetailTraining): Promise<ISessionDetailTraining> => {
    return await prisma.sesiJadwalTraining.create({
        data: {
            detailJadwalTrainingId: payload.detailJadwalTrainingId,
            jamMulai: payload.jamMulai,
            jamSelesai: payload.jamSelesai,
            aktivitas: payload.aktivitas
        }
    });
};

export const getSessionDetailSchedule = async (id: string) => {
    return await prisma.sesiJadwalTraining.findUnique({ where: { id } });
}

export const updateSessionDetailSchedule = async (id: string, payload: Partial<ICreateSessionDetailTraining>): Promise<ISessionDetailTraining> => {
    return await prisma.sesiJadwalTraining.update({
        where: { id },
        data: {
            ...(payload?.jamMulai && { jamMulai: payload.jamMulai }),
            ...(payload?.jamSelesai && { jamSelesai: payload.jamSelesai }),
            ...(payload?.aktivitas && { aktivitas: payload.aktivitas }),
        }
    })
}

export const deleteSessionDetailSchedule = async (id: string): Promise<ISessionDetailTraining> => {
    return await prisma.sesiJadwalTraining.delete({ where: { id } });
};

export const getSessionDetailSchedules = async (payload: IPagination): Promise<ISessionDetailTraining[]> => {
    const { skip, take, where, orderBy } = payload;

    return await prisma.sesiJadwalTraining.findMany({ 
        skip,
        take,
        where,
        include: {
            detailJadwalTraining: true,
        },
        orderBy
     });
};

export const countSessionDetailSchedule = async (where: any): Promise<number> => {
    return await prisma.sesiJadwalTraining.count({ where });
}