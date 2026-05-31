import { prisma } from '../utils/client';

export const getMyTrainingAsPeserta = async (
    userId: string,
    skip: number,
    take: number,
) => {
    return await prisma.pesertaTraining.findMany({
        skip,
        take,
        where: { userId },
        include: {
            jadwalTraining: {
                include: {
                    training: {
                        select: { namaTraining: true },
                    },
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
};

export const countMyTrainingAsPeserta = async (userId: string): Promise<number> => {
    return await prisma.pesertaTraining.count({
        where: { userId },
    });
};

export const getMyTrainingAsInstruktur = async (
    userId: string,
    skip: number,
    take: number,
) => {
    const details = await prisma.detailJadwalTraining.findMany({
        skip,
        take,
        where: { instrukturId: userId },
        include: {
            jadwalTraining: {
                include: {
                    training: {
                        select: { namaTraining: true },
                    },
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });

    const unique = new Map<string, any>();

    for (const d of details) {
        const jtId = d.jadwalTrainingId;
        if (!unique.has(jtId)) {
            unique.set(jtId, d.jadwalTraining);
        }
    }

    return Array.from(unique.values());
};

export const countMyTrainingAsInstruktur = async (userId: string): Promise<number> => {
    const result = await prisma.detailJadwalTraining.findMany({
        where: { instrukturId: userId },
        select: { jadwalTrainingId: true },
        distinct: ['jadwalTrainingId'],
    });
    return result.length;
};

export const getMyTrainingAsAsesor = async (
    userId: string,
    skip: number,
    take: number,
) => {
    const details = await prisma.detailJadwalTraining.findMany({
        skip,
        take,
        where: { asesorId: userId },
        include: {
            jadwalTraining: {
                include: {
                    training: {
                        select: { namaTraining: true },
                    },
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });

    const unique = new Map<string, any>();

    for (const d of details) {
        const jtId = d.jadwalTrainingId;
        if (!unique.has(jtId)) {
            unique.set(jtId, d.jadwalTraining);
        }
    }

    return Array.from(unique.values());
};

export const countMyTrainingAsAsesor = async (userId: string): Promise<number> => {
    const result = await prisma.detailJadwalTraining.findMany({
        where: { asesorId: userId },
        select: { jadwalTrainingId: true },
        distinct: ['jadwalTrainingId'],
    });
    return result.length;
};

export const getDetailJadwalByJadwalTrainingId = async (
    jadwalTrainingId: string,
) => {
    return await prisma.detailJadwalTraining.findMany({
        where: { jadwalTrainingId },
        include: {
            jadwalTraining: {
                include: {
                    training: { select: { namaTraining: true } },
                },
            },
            instruktur: {
                select: { id: true, name: true },
            },
            asesor: {
                select: { id: true, name: true },
            },
            sesiJadwalTraining: {
                select: { aktivitas: true },
            },
        },
        orderBy: { hariKe: 'asc' },
    });
};

export const getSesiByDetailJadwalId = async (
    detailJadwalTrainingId: string,
    skip: number,
    take: number,
) => {
    return await prisma.sesiJadwalTraining.findMany({
        skip,
        take,
        where: { detailJadwalTrainingId },
        include: {
            detailJadwalTraining: {
                include: {
                    instruktur: { select: { name: true } },
                    asesor: { select: { name: true } },
                },
            },
        },
        orderBy: { jamMulai: 'asc' },
    });
};

export const countSesiByDetailJadwalId = async (
    detailJadwalTrainingId: string,
): Promise<number> => {
    return await prisma.sesiJadwalTraining.count({
        where: { detailJadwalTrainingId },
    });
};
