import { prisma } from '../utils/client';

export const getUserWithProfile = async (userId: string) => {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            noWa: true,
            role: true,
            image: true,
            profilPeserta: {
                select: {
                    instansi: true,
                },
            },
        },
    });
};

export const updateUserProfile = async (
    userId: string,
    data: { name?: string; email?: string; noWa?: string },
) => {
    return await prisma.user.update({
        where: { id: userId },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            noWa: true,
        },
    });
};

export const updateProfilPeserta = async (
    userId: string,
    instansi: string,
) => {
    return await prisma.profilPeserta.upsert({
        where: { userId },
        update: { instansi },
        create: { userId, instansi, fileCv: '', fileIjazah: '', fileKtp: '' },
    });
};

export const getUserPassword = async (userId: string) => {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: { password: true },
    });
};

export const updatePassword = async (userId: string, hashedPassword: string) => {
    return await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
    });
};
