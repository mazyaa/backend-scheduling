import { HttpError } from '../utils/error';
import * as penilaianRepository from '../repositories/penilaian';

export const getMyStatus = async (
    userId: string,
    page: number,
    limit: number,
) => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        penilaianRepository.getPenilaianByUserId(userId, skip, limit),
        penilaianRepository.countPenilaianByUserId(userId),
    ]);

    const totalPages = Math.ceil(total / limit);

    const baseUrl = (process.env.BASE_URL || '').replace(/\/+$/, '');

    const mappedData = data.map((item) => {
        const hasSertifikat = item.sertifikat.length > 0;
        const fileSertifikat = hasSertifikat
            ? `http://${baseUrl}/e-sertifikat/${item.id}/download`
            : null;

        const fileRevisiAdmin = item.revisiFile?.fileRevisiAdmin
            ? `http://${baseUrl}/revisi/${item.id}/revisi/download`
            : null;

        const fileRevisiPeserta = item.revisiFile?.fileRevisiPeserta
            ? `http://${baseUrl}/revisi/${item.id}/revisi-peserta/download`
            : null;

        return {
            nama: item.user.name,
            training: item.jadwalTraining.training.namaTraining,
            batch: item.jadwalTraining.batch,
            statusKompetensi: item.statusKompetensi,
            fileSertifikat,
            fileRevisiAdmin,
            fileRevisiPeserta,
            statusRevisi: item.revisiFile?.status ?? null,
        };
    });

    return {
        data: mappedData,
        pagination: {
            total,
            totalPages,
            currentPage: page,
            limit,
            hasNext: page < totalPages,
            hasPrevious: page > 1,
        },
    };
};

export const getPenilaianPeserta = async (
    jadwalTrainingId: string,
    page: number,
    limit: number,
    search?: string,
) => {
    const skip = (page - 1) * limit;

    const where: any = { jadwalTrainingId };

    if (search?.trim()) {
        where.user = {
            name: { contains: search.trim(), mode: 'insensitive' },
        };
    }

    const [data, total] = await Promise.all([
        penilaianRepository.getPenilaianByJadwalTrainingId(jadwalTrainingId, skip, limit),
        penilaianRepository.countPenilaianByJadwalTrainingId(jadwalTrainingId),
    ]);

    const totalPages = Math.ceil(total / limit);

    const mappedData = data.map((item) => ({
        namaPeserta: item.user.name,
        training: item.jadwalTraining.training.namaTraining,
        batch: item.jadwalTraining.batch,
        statusKompetensi: item.statusKompetensi,
        catatan: item.catatan,
        fileRevisiAdmin: item.revisiFile?.fileRevisiAdmin ?? null,
        statusRevisi: item.revisiFile?.status ?? null,
        penilaianId: item.id,
    }));

    return {
        data: mappedData,
        pagination: {
            total,
            totalPages,
            currentPage: page,
            limit,
            hasNext: page < totalPages,
            hasPrevious: page > 1,
        },
    };
};

export const getAllPenilaian = async (
    page: number,
    limit: number,
    search?: string,
) => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        penilaianRepository.getAllPenilaian(skip, limit, search),
        penilaianRepository.countAllPenilaian(search),
    ]);

    const totalPages = Math.ceil(total / limit);

    const mappedData = data.map((item) => ({
        namaPeserta: item.user.name,
        training: item.jadwalTraining.training.namaTraining,
        batch: item.jadwalTraining.batch,
        statusKompetensi: item.statusKompetensi,
        catatan: item.catatan,
        fileRevisiAdmin: item.revisiFile?.fileRevisiAdmin ?? null,
        statusRevisi: item.revisiFile?.status ?? null,
        penilaianId: item.id,
    }));

    return {
        data: mappedData,
        pagination: {
            total,
            totalPages,
            currentPage: page,
            limit,
            hasNext: page < totalPages,
            hasPrevious: page > 1,
        },
    };
};
