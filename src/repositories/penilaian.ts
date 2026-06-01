import { prisma } from '../utils/client';

export const getPenilaianByUserId = async (
    userId: string,
    skip: number,
    take: number,
) => {
    return await prisma.penilaian.findMany({
        skip,
        take,
        where: { userId },
        include: {
            user: {
                select: { name: true, email: true },
            },
            jadwalTraining: {
                include: {
                    training: { select: { namaTraining: true } },
                },
            },
            revisiFile: {
                select: {
                    id: true,
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

export const countPenilaianByUserId = async (userId: string): Promise<number> => {
    return await prisma.penilaian.count({
        where: { userId },
    });
};

export const getPenilaianByJadwalTrainingId = async (
    jadwalTrainingId: string,
    skip: number,
    take: number,
) => {
    return await prisma.penilaian.findMany({
        skip,
        take,
        where: { jadwalTrainingId },
        include: {
            user: {
                select: { name: true, email: true, noWa: true },
            },
            jadwalTraining: {
                include: {
                    training: { select: { namaTraining: true } },
                },
            },
            revisiFile: {
                select: {
                    id: true,
                    fileRevisiAdmin: true,
                    fileRevisiPeserta: true,
                    status: true,
                },
            },
            sertifikat: {
                select: { id: true },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
};

export const countPenilaianByJadwalTrainingId = async (
    jadwalTrainingId: string,
): Promise<number> => {
    return await prisma.penilaian.count({
        where: { jadwalTrainingId },
    });
};

export const getAllPenilaian = async (
    skip: number,
    take: number,
    search?: string,
) => {
    const where: any = {};

    if (search?.trim()) {
        where.user = {
            name: { contains: search.trim(), mode: 'insensitive' },
        };
    }

    return await prisma.penilaian.findMany({
        skip,
        take,
        where,
        include: {
            user: {
                select: { name: true, email: true, noWa: true },
            },
            jadwalTraining: {
                include: {
                    training: { select: { namaTraining: true } },
                },
            },
            revisiFile: {
                select: {
                    id: true,
                    fileRevisiAdmin: true,
                    fileRevisiPeserta: true,
                    status: true,
                },
            },
            sertifikat: {
                select: { id: true },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
};

export const countAllPenilaian = async (search?: string): Promise<number> => {
    const where: any = {};

    if (search?.trim()) {
        where.user = {
            name: { contains: search.trim(), mode: 'insensitive' },
        };
    }

    return await prisma.penilaian.count({
        where,
    });
};
