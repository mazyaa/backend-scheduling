import { prisma } from '../utils/client';
import { ICreateMateri, IMateri, IPagination } from '../utils/interfaces';

export const createMateri = async (payload: ICreateMateri): Promise<IMateri> => {
    return await prisma.materiTraining.create({
        data: {
            detailJadwalTrainingId: payload.detailJadwalTrainingId,
            judul: payload.judul,
            fileMateri: payload.fileMateri,
            diuploadOleh: payload.diuploadOleh,
        }
    });
};

export const getMateriById = async (id: string) => {
    return await prisma.materiTraining.findUnique({
        where: { id },
        include: {
            detailJadwalTraining: {
                include: {
                    jadwalTraining: {
                        include: {
                            training: true,
                        }
                    }
                }
            },
            uploader: {
                select: {
                    id: true,
                    name: true,
                    role: true,
                }
            }
        }
    });
};

export const updateMateri = async (id: string, payload: Partial<ICreateMateri>): Promise<IMateri> => {
    return await prisma.materiTraining.update({
        where: { id },
        data: {
            ...(payload.detailJadwalTrainingId && { detailJadwalTrainingId: payload.detailJadwalTrainingId }),
            ...(payload.judul && { judul: payload.judul }),
            ...(payload.fileMateri !== undefined && { fileMateri: payload.fileMateri }),
            ...(payload.diuploadOleh && { diuploadOleh: payload.diuploadOleh }),
        }
    });
};

export const deleteMateri = async (id: string): Promise<IMateri> => {
    return await prisma.materiTraining.delete({
        where: { id },
    });
};

export const getAllMateri = async (payload: IPagination): Promise<IMateri[]> => {
    const { skip, take, where, orderBy } = payload;

    return await prisma.materiTraining.findMany({
        skip,
        take,
        where,
        include: {
            detailJadwalTraining: {
                include: {
                    jadwalTraining: {
                        include: {
                            training: true,
                        }
                    }
                }
            },
            uploader: {
                select: {
                    id: true,
                    name: true,
                    role: true,
                }
            }
        },
        orderBy,
    });
};

export const countMateri = async (where?: object): Promise<number> => {
    return await prisma.materiTraining.count({ where });
};
