import { prisma } from '../utils/client';
import { StatusRevisi } from '@prisma/client';

export const getRevisiByPenilaianId = async (penilaianId: string) => {
    return await prisma.revisiFile.findUnique({
        where: { penilaianId },
    });
};

export const createRevisi = async (penilaianId: string, fileRevisiAdmin: string) => {
    return await prisma.revisiFile.create({
        data: {
            penilaianId,
            fileRevisiAdmin,
        },
    });
};

export const updateRevisi = async (penilaianId: string, fileRevisiAdmin: string) => {
    return await prisma.revisiFile.update({
        where: { penilaianId },
        data: {
            fileRevisiAdmin,
        },
    });
};

export const updateRevisiPeserta = async (penilaianId: string, fileRevisiPeserta: string) => {
    const existing = await prisma.revisiFile.findUnique({
        where: { penilaianId },
    });

    if (existing) {
        return await prisma.revisiFile.update({
            where: { penilaianId },
            data: { fileRevisiPeserta },
        });
    }

    return await prisma.revisiFile.create({
        data: {
            penilaianId,
            fileRevisiPeserta,
        },
    });
};

export const updateStatusRevisi = async (
    penilaianId: string,
    status: StatusRevisi,
) => {
    return await prisma.revisiFile.update({
        where: { penilaianId },
        data: { status },
    });
};

export const getKompetensiPeserta = async (
    skip: number,
    take: number,
    where: any,
) => {
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
                },
            },
            jadwalTraining: {
                include: {
                    training: {
                        select: {
                            namaTraining: true,
                        },
                    },
                },
            },
            revisiFile: {
                select: {
                    fileRevisiAdmin: true,
                    fileRevisiPeserta: true,
                    status: true,
                },
            },
            sertifikat: {
                select: {
                    id: true,
                    fileSertifikat: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
};

export const countKompetensiPeserta = async (where: any): Promise<number> => {
    return await prisma.penilaian.count({ where });
};
