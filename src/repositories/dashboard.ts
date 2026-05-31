import { prisma } from '../utils/client';
import { RoleUser } from '@prisma/client';

export const countTotalSertifikat = async (): Promise<number> => {
    return await prisma.sertifikat.count();
};

export const countTotalPeserta = async (): Promise<number> => {
    return await prisma.user.count({
        where: { role: RoleUser.peserta },
    });
};

export const countTotalInstruktur = async (): Promise<number> => {
    return await prisma.user.count({
        where: { role: RoleUser.instruktur },
    });
};

export const countTotalAsesor = async (): Promise<number> => {
    return await prisma.user.count({
        where: { role: RoleUser.asesor },
    });
};

export const getSertifikatPerBulan = async (year: number) => {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    const sertifikatList = await prisma.sertifikat.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lt: endDate,
            },
        },
        select: {
            createdAt: true,
        },
    });

    const monthsData: Record<number, number> = {};

    for (let i = 0; i < 12; i++) {
        monthsData[i] = 0;
    }

    for (const s of sertifikatList) {
        const month = s.createdAt.getMonth();
        monthsData[month]++;
    }

    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ];

    return Object.entries(monthsData).map(([month, total]) => ({
        bulan: monthNames[Number(month)],
        tahun: year,
        total,
    }));
};
