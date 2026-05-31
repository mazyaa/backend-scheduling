import { RoleUser } from '@prisma/client';
import { HttpError } from '../utils/error';
import * as myTrainingRepository from '../repositories/myTraining';

export const getMyTraining = async (
    userId: string,
    role: string,
    page: number,
    limit: number,
) => {
    const skip = (page - 1) * limit;

    let data: any[] = [];
    let total = 0;

    if (role === RoleUser.peserta) {
        [data, total] = await Promise.all([
            myTrainingRepository.getMyTrainingAsPeserta(userId, skip, limit),
            myTrainingRepository.countMyTrainingAsPeserta(userId),
        ]);
    } else if (role === RoleUser.instruktur) {
        [data, total] = await Promise.all([
            myTrainingRepository.getMyTrainingAsInstruktur(userId, skip, limit),
            myTrainingRepository.countMyTrainingAsInstruktur(userId),
        ]);
    } else if (role === RoleUser.asesor) {
        [data, total] = await Promise.all([
            myTrainingRepository.getMyTrainingAsAsesor(userId, skip, limit),
            myTrainingRepository.countMyTrainingAsAsesor(userId),
        ]);
    }

    const totalPages = Math.ceil(total / limit);

    const mappedData = data.map((item: any) => {
        const jt = item.jadwalTraining;
        return {
            namaTraining: jt.training.namaTraining,
            tanggalMulai: jt.startDate,
            durasi: jt.duration,
            meetingLink: jt.meetingLink,
            batch: jt.batch,
            jadwalTrainingId: jt.id,
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

export const getDetailJadwal = async (jadwalTrainingId: string) => {
    const details = await myTrainingRepository.getDetailJadwalByJadwalTrainingId(
        jadwalTrainingId,
    );

    if (!details.length) {
        throw new HttpError('Detail jadwal training tidak ditemukan.', 404);
    }

    const mappedData = details.map((item) => ({
        namaTraining: item.jadwalTraining.training.namaTraining,
        tanggal: item.hari,
        hariKe: item.hariKe,
        aktivitas: item.sesiJadwalTraining?.map((s: any) => s.aktivitas).join(', ') || '-',
        namaInstruktur: item.instruktur?.name ?? '-',
        namaAsesor: item.asesor?.name ?? '-',
        detailJadwalId: item.id,
    }));

    return mappedData;
};

export const getSesiDetail = async (
    detailJadwalId: string,
    page: number,
    limit: number,
) => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        myTrainingRepository.getSesiByDetailJadwalId(detailJadwalId, skip, limit),
        myTrainingRepository.countSesiByDetailJadwalId(detailJadwalId),
    ]);

    if (!data.length) {
        throw new HttpError('Sesi tidak ditemukan.', 404);
    }

    const totalPages = Math.ceil(total / limit);

    return {
        data,
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
