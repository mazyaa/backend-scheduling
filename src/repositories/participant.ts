import { prisma } from "../utils/client";
import { RoleUser } from '@prisma/client';
import { ICreateParticipant, IPagination, IParticipant } from "../utils/interfaces";

export const createPeserta = async (payload: ICreateParticipant) => {
    return await prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            noWa: payload.noWa,
            role: RoleUser.peserta,
            password: payload.password,
            profilPeserta: {
                create: {
                    instansi: payload.instansi || '-', // provide standard default if needed
                    fileCv: payload.fileCv || '',
                    fileIjazah: payload.fileIjazah || '',
                    fileSuratRekomendasi: payload.fileSuratRekomendasi || null,
                    fileKtp: payload.fileKtp || '',
                    fileFoto: payload.fileFoto || null,
                    fileBuktiBayar: payload.fileBuktiBayar || null,
                    fileBuktiFollow: payload.fileBuktiFollow || null,
                }
            },
            // Optionally link to training
            ...(payload.jadwalTrainingId && {
                pesertaTraining: {
                    create: { jadwalTrainingId: payload.jadwalTrainingId }
                }
            })
        },
        include: {
            profilPeserta: true
        }
    });
};

export const getPesertaById = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
        include: { profilPeserta: true, pesertaTraining: true }
    });
};

export const getAllParticipant = async (params: IPagination) => {
    return await prisma.user.findMany({
        where: { ...params.where, role: RoleUser.peserta },
        skip: params.skip,
        take: params.take,
        orderBy: params.orderBy || { createdAt: 'desc' },
        include: { profilPeserta: true, pesertaTraining: true }
    });
};

export const countParticipant = async (where: any) => {
    return await prisma.user.count({
        where: { ...where, role: RoleUser.peserta }
    });
};

export const updatePeserta = async (id: string, payload: ICreateParticipant) => {
    return await prisma.user.update({
        where: { id },
        data: {
            name: payload.name,
            email: payload.email,
            noWa: payload.noWa,
            password: payload.password,
            profilPeserta: {
                upsert: {
                    create: {
                        instansi: payload.instansi || '-',
                        fileCv: payload.fileCv || '',
                        fileIjazah: payload.fileIjazah || '',
                        fileSuratRekomendasi: payload.fileSuratRekomendasi || null,
                        fileKtp: payload.fileKtp || '',
                        fileFoto: payload.fileFoto || null,
                        fileBuktiBayar: payload.fileBuktiBayar || null,
                        fileBuktiFollow: payload.fileBuktiFollow || null,
                    },
                    update: {
                        instansi: payload.instansi,
                        fileCv: payload.fileCv,
                        fileIjazah: payload.fileIjazah,
                        fileSuratRekomendasi: payload.fileSuratRekomendasi,
                        fileKtp: payload.fileKtp,
                        fileFoto: payload.fileFoto,
                        fileBuktiBayar: payload.fileBuktiBayar,
                        fileBuktiFollow: payload.fileBuktiFollow,
                    }
                }
            }
        },
        include: { profilPeserta: true }
    });
};

export const deletePeserta = async (id: string) => {
    return await prisma.user.delete({
        where: { id }
    });
};
