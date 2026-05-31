import { prisma } from '../utils/client';

export const getSertifikatWithJadwal = async (where: any) => {
    return await prisma.sertifikat.findMany({
        where,
        select: {
            id: true,
            penilaian: {
                select: {
                    jadwalTrainingId: true,
                    jadwalTraining: {
                        select: {
                            id: true,
                            batch: true,
                            training: {
                                select: {
                                    namaTraining: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
};

export const countSertifikat = async (where: any): Promise<number> => {
    return await prisma.sertifikat.count({ where });
};

export const getPesertaLaporan = async (where: any, skip: number, take: number) => {
    return await prisma.penilaian.findMany({
        skip,
        take,
        where,
        select: {
            id: true,
            statusKompetensi: true,
            user: {
                select: {
                    name: true,
                },
            },
            jadwalTraining: {
                select: {
                    batch: true,
                    training: {
                        select: {
                            namaTraining: true,
                        },
                    },
                },
            },
            revisiFile: {
                select: {
                    id: true,
                },
            },
            sertifikat: {
                select: {
                    id: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};

export const countPesertaLaporan = async (where: any): Promise<number> => {
    return await prisma.penilaian.count({ where });
};
