import { prisma } from "../utils/client";
import type { ICreateSchedule, IPagination } from "../utils/interfaces";

export const createSchedule = async (payload: ICreateSchedule): Promise<ICreateSchedule> => {
    return await prisma.jadwalTraining.create({
        data: {
            trainingId: payload.trainingId,
            userId: payload.userId,
            startDate: payload.startDate,
            duration: payload.duration,
            meetingLink: payload.meetingLink,
            batch: payload.batch,
        }
    });
}

export const getScheduleById = async (id: string): Promise<ICreateSchedule | null> => {
    return await prisma.jadwalTraining.findUnique({ // if using findUnique attribute must be unique (id is unique)
        where: { id },
    })
}


export const updateSchedule = async (id: string, payload: Partial<ICreateSchedule>): Promise<ICreateSchedule> => { // Partial<IUser> means that all properties in IUser are optional
    return await prisma.jadwalTraining.update({
        where: { id},
        data: { ...payload }
    });
}

export const deleteSchedule = async (id: string): Promise<ICreateSchedule> => {
    return await prisma.jadwalTraining.delete({
        where: { id }
    });
};

export const getAllSchedules = async (payload: IPagination): Promise<ICreateSchedule[]> => {
    const { skip, take, where, orderBy } = payload;
    return await prisma.jadwalTraining.findMany({
       skip,
       take,
       where,
       orderBy,
    });
}

export const countSchedule = async (where?: object): Promise<number> => {
    return await prisma.jadwalTraining.count({
        where,
    });
}