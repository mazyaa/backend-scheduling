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


