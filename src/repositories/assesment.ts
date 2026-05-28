import { prisma } from '../utils/client';
import { ICreateAssesment, IAssesment, IPagination } from '../utils/interfaces';

export const createAssesment = async (payload: ICreateAssesment): Promise<IAssesment> => {
    return await prisma.penilaian.create({
        data: {
            userId: payload.userId,
            jadwalTrainingId: payload.jadwalTrainingId,
            statusKompetensi: payload.statusKompetensi,
            catatan: payload.catatan,
        }
    });
};

export const getAssesmentById = async (id: string) => {
    return await prisma.penilaian.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                }
            },
            jadwalTraining: {
                include: {
                    training: true,
                }
            }
        }
    });
};

export const getAssesmentByUserAndJadwal = async (
    userId: string,
    jadwalTrainingId: string,
): Promise<IAssesment | null> => {
    return await prisma.penilaian.findUnique({
        where: {
            userId_jadwalTrainingId: {
                userId,
                jadwalTrainingId,
            }
        }
    });
};

export const updateAssesment = async (id: string, payload: Partial<ICreateAssesment>): Promise<IAssesment> => {
    return await prisma.penilaian.update({
        where: { id },
        data: {
            ...(payload.userId && { userId: payload.userId }),
            ...(payload.jadwalTrainingId && { jadwalTrainingId: payload.jadwalTrainingId }),
            ...(payload.statusKompetensi && { statusKompetensi: payload.statusKompetensi }),
            ...(payload.catatan && { catatan: payload.catatan }),
        }
    });
};

export const deleteAssesment = async (id: string): Promise<IAssesment> => {
    return await prisma.penilaian.delete({
        where: { id },
    });
};

export const getAllAssesment = async (payload: IPagination): Promise<IAssesment[]> => {
    const { skip, take, where, orderBy } = payload;

    return await prisma.penilaian.findMany({
        skip,
        take,
        where,
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                }
            },
            jadwalTraining: {
                include: {
                    training: true,
                }
            }
        },
        orderBy,
    });
};

export const countAssesment = async (where?: object): Promise<number> => {
    return await prisma.penilaian.count({ where });
};
