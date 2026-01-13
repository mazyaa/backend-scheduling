import { ICreateTraining, IPagination, ITraining } from "../utils/interfaces";
import { prisma } from "../utils/client";

export const createTraining = async (payload: ICreateTraining): Promise<ITraining> => {
    return prisma.training.create({
        data: {
            namaTraining: payload.namaTraining,
            description: payload.description,
        }
    });
};

export const getTrainingById = async (id: string): Promise<ITraining | null> => {
    return prisma.training.findUnique({ // must be unique, id is unique
        where: { id },
    });
};

export const updateTraining = async (id: string, payload: ICreateTraining): Promise<ITraining> => {
    return prisma.training.update({
        where: { id },
        data: { ...payload },
    });
};

export const deleteTraining = async (id: string): Promise<ITraining> => {
    return prisma.training.delete({
        where: { id },
    });
};

export const getAllTraining = async (paylaod: IPagination): Promise<ITraining[]> => {
    const { skip, take, where, orderBy } = paylaod;

    return prisma.training.findMany({
         skip,
         take,
         where,
         orderBy,
    });
};

export const countTraining = async (where?: object): Promise<number> => {
    return prisma.training.count({ where });
};