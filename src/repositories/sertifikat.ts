import { prisma } from '../utils/client';

export const getSertifikatByNomor = async (nomorSertifikat: string) => {
    return await prisma.sertifikat.findUnique({
        where: { nomorSertifikat },
        select: {
            nomorSertifikat: true,
            createdAt: true,
            penilaian: {
                select: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            noWa: true,
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
                },
            },
            materiTraining: {
                select: {
                    judul: true,
                },
            },
        },
    });
};
