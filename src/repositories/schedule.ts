import { prisma } from "../utils/client";
import { startOfDay, endOfDay } from "date-fns";
import type { ICreateSchedule, IPagination } from "../utils/interfaces";

export const createSchedule = async (payload: ICreateSchedule): Promise<ICreateSchedule> => {
    return await prisma.jadwalTraining.create({
        data: {
            trainingId: payload.trainingId,
            startDate: new Date(payload.startDate),
            duration: payload.duration,
            meetingLink: payload.meetingLink,
            batch: payload.batch,
            detailJadwal: {
                createMany: {
                    data: payload.detailJadwal || [],
                }
            }
        }
    });
}

export const getScheduleById = async (id: string): Promise<ICreateSchedule | null> => {
    return await prisma.jadwalTraining.findUnique({ // if using findUnique attribute must be unique (id is unique)
        where: { id },
    })
}


export const updateSchedule = async (id: string, payload: Partial<Omit<ICreateSchedule, "detailJadwal">>): Promise<ICreateSchedule> => { // Partial<IUser> means that all properties in IUser are optional
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


export const checkConflictSchedule = async (startDate: Date, batch: string) => {
    const startDay = startOfDay(startDate); // use startOfDay to get the start of the day ex: 2023-10-10 00:00:00
    const endDay = endOfDay(startDate); // use endOfDay to get the end of the day ex: 2023-10-10 23:59:59

    return await prisma.jadwalTraining.findFirst({
        where: {
            startDate: {
                gte: startDay, // greater than or equal to startDay 
                lte: endDay // less than or equal to endDay
            },
            batch: {
                equals: batch // use equals to match exact batch
            }
        }
    });
}