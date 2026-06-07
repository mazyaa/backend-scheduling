import { prisma } from '../utils/client';

const buildSearchWhere = (search?: string) => {
    if (!search?.trim()) return {};
    return {
        jadwalTraining: {
            OR: [
                { training: { namaTraining: { contains: search.trim(), mode: 'insensitive' as const } } },
                { batch: { contains: search.trim(), mode: 'insensitive' as const } },
            ],
        },
    };
};

export const getMyTrainingAsPeserta = async (
    userId: string,
    skip: number,
    take: number,
    search?: string,
) => {
    const where: any = { userId, ...buildSearchWhere(search) };

    return await prisma.pesertaTraining.findMany({
        skip,
        take,
        where,
        include: {
            jadwalTraining: {
                include: {
                    training: { select: { namaTraining: true } },
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
};

export const countMyTrainingAsPeserta = async (
    userId: string,
    search?: string,
): Promise<number> => {
    const where: any = { userId, ...buildSearchWhere(search) };
    return await prisma.pesertaTraining.count({ where });
};

export const getMyTrainingAsInstruktur = async (
    userId: string,
    skip: number,
    take: number,
    search?: string,
) => {
    const where: any = { instrukturId: userId, ...buildSearchWhere(search) };

    const details = await prisma.detailJadwalTraining.findMany({
        skip,
        take,
        where,
        include: {
            jadwalTraining: {
                include: {
                    training: { select: { namaTraining: true } },
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

export const countMyTrainingAsInstruktur = async (
    userId: string,
    search?: string,
): Promise<number> => {
    const where: any = { instrukturId: userId, ...buildSearchWhere(search) };
    const result = await prisma.detailJadwalTraining.findMany({
        where,
        select: { jadwalTrainingId: true },
        distinct: ['jadwalTrainingId'],
    });
    return result.length;
};

export const getMyTrainingAsAsesor = async (
    userId: string,
    skip: number,
    take: number,
    search?: string,
) => {
    const where: any = { asesorId: userId, ...buildSearchWhere(search) };

    const details = await prisma.detailJadwalTraining.findMany({
        skip,
        take,
        where,
        include: {
            jadwalTraining: {
                include: {
                    training: { select: { namaTraining: true } },
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

export const countMyTrainingAsAsesor = async (
    userId: string,
    search?: string,
): Promise<number> => {
    const where: any = { asesorId: userId, ...buildSearchWhere(search) };
    const result = await prisma.detailJadwalTraining.findMany({
        where,
        select: { jadwalTrainingId: true },
        distinct: ['jadwalTrainingId'],
    });
    return result.length;
};

export const getDetailJadwalByJadwalTrainingId = async (
    jadwalTrainingId: string,
    skip: number,
    take: number,
    search?: string,
) => {
    const where: any = { jadwalTrainingId };

    if (search?.trim()) {
        where.hariKe = parseInt(search.trim(), 10) || undefined;
    }

    const [data, total] = await Promise.all([
        prisma.detailJadwalTraining.findMany({
            skip,
            take,
            where,
            include: {
                jadwalTraining: {
                    include: {
                        training: { select: { namaTraining: true } },
                    },
                },
                instruktur: {
                    select: { name: true },
                },
                asesor: {
                    select: { name: true },
                },
            },
            orderBy: { hariKe: 'asc' },
        }),
        prisma.detailJadwalTraining.count({ where }),
    ]);

    return { data, total };
};

export const getSesiByDetailJadwalId = async (
    detailJadwalTrainingId: string,
    skip: number,
    take: number,
    search?: string,
) => {
    const where: any = { detailJadwalTrainingId };

    if (search?.trim()) {
        where.aktivitas = { contains: search.trim(), mode: 'insensitive' };
    }

    const [data, total] = await Promise.all([
        prisma.sesiJadwalTraining.findMany({
            skip,
            take,
            where,
            include: {
                detailJadwalTraining: {
                    include: {
                        instruktur: {
                            select: { name: true },
                        },
                        asesor: {
                            select: { name: true },
                        },
                    },
                },
            },
            orderBy: { jamMulai: 'asc' },
        }),
        prisma.sesiJadwalTraining.count({ where }),
    ]);

    return { data, total };
};

export const getParticipantsByJadwalTrainingId = async (
    jadwalTrainingId: string,
    skip: number,
    take: number,
    search?: string,
) => {
    const where: any = {
        role: 'peserta' as const,
        pesertaTraining: {
            some: { jadwalTrainingId },
        },
    };

    if (search?.trim()) {
        where.name = { contains: search.trim(), mode: 'insensitive' };
    }

    const [data, total] = await Promise.all([
        prisma.user.findMany({
            skip,
            take,
            where,
            include: {
                pesertaTraining: {
                    include: {
                        jadwalTraining: true,
                    },
                },
                profilPeserta: true,
                penilaian: {
                    where: { jadwalTrainingId },
                    select: {
                        id: true,
                        statusKompetensi: true,
                        catatan: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        }),
        prisma.user.count({ where }),
    ]);

    return { data, total };
};

export const getJadwalInstructorsAndAssessors = async (jadwalTrainingId: string) => {
    const details = await prisma.detailJadwalTraining.findMany({
        where: { jadwalTrainingId },
        select: {
            instruktur: {
                select: { id: true, name: true },
            },
            asesor: {
                select: { id: true, name: true },
            },
        },
    });

    const instrukturMap = new Map<string, { id: string; name: string }>();
    const asesorMap = new Map<string, { id: string; name: string }>();

    for (const d of details) {
        if (d.instruktur) instrukturMap.set(d.instruktur.id, d.instruktur);
        if (d.asesor) asesorMap.set(d.asesor.id, d.asesor);
    }

    return {
        instruktur: Array.from(instrukturMap.values()),
        asesor: Array.from(asesorMap.values()),
    };
};
