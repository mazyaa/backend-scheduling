import { RoleUser } from '@prisma/client';
import { HttpError } from '../utils/error';
import { toTimeString } from '../utils/helper';
import * as myTrainingRepository from '../repositories/myTraining';

export const getMyTraining = async (
    userId: string,
    role: string,
    page: number,
    limit: number,
    search?: string,
) => {
    const skip = (page - 1) * limit;

    let data: any[] = [];
    let total = 0;

    if (role === RoleUser.peserta) {
        [data, total] = await Promise.all([
            myTrainingRepository.getMyTrainingAsPeserta(userId, skip, limit, search),
            myTrainingRepository.countMyTrainingAsPeserta(userId, search),
        ]);
    } else if (role === RoleUser.instruktur) {
        [data, total] = await Promise.all([
            myTrainingRepository.getMyTrainingAsInstruktur(userId, skip, limit, search),
            myTrainingRepository.countMyTrainingAsInstruktur(userId, search),
        ]);
    } else if (role === RoleUser.asesor) {
        [data, total] = await Promise.all([
            myTrainingRepository.getMyTrainingAsAsesor(userId, skip, limit, search),
            myTrainingRepository.countMyTrainingAsAsesor(userId, search),
        ]);
    }

    const totalPages = Math.ceil(total / limit);

    const mappedData = data.map((item: any) => {
        const jt = item.jadwalTraining || item;
        const startDate = new Date(jt.startDate);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + jt.duration - 1);

        return {
            id: jt.id,
            namaTraining: jt.training.namaTraining,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            duration: jt.duration,
            meetingLink: jt.meetingLink,
            batch: jt.batch,
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

export const getDetailJadwal = async (
    jadwalTrainingId: string,
    page: number,
    limit: number,
    search?: string,
) => {
    const skip = (page - 1) * limit;

    const { data, total } = await myTrainingRepository.getDetailJadwalByJadwalTrainingId(
        jadwalTrainingId, skip, limit, search,
    );

    if (!data.length) {
        throw new HttpError('Detail jadwal training tidak ditemukan.', 404);
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

export const getSesiDetail = async (
    detailJadwalId: string,
    page: number,
    limit: number,
    search?: string,
) => {
    const skip = (page - 1) * limit;

    const { data, total } = await myTrainingRepository.getSesiByDetailJadwalId(
        detailJadwalId, skip, limit, search,
    );

    if (!data.length) {
        throw new HttpError('Sesi tidak ditemukan.', 404);
    }

    const totalPages = Math.ceil(total / limit);

    const mappedData = data.map((item) => ({
        id: item.id,
        detailJadwalTrainingId: item.detailJadwalTrainingId,
        jamMulai: toTimeString(item.jamMulai),
        jamSelesai: toTimeString(item.jamSelesai),
        aktivitas: item.aktivitas,
        pic: item.pic,
        detailJadwalTraining: {
            instruktur: item.detailJadwalTraining?.instruktur ?? null,
            asesor: item.detailJadwalTraining?.asesor ?? null,
        },
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

export const getParticipants = async (
    userId: string,
    jadwalTrainingId: string,
    page: number,
    limit: number,
    search?: string,
) => {
    const { instruktur, asesor } = await myTrainingRepository.getJadwalInstructorsAndAssessors(jadwalTrainingId);

    const isAssigned = instruktur.some((i) => i.id === userId) || asesor.some((a) => a.id === userId);
    if (!isAssigned) {
        throw new HttpError('Forbidden: Anda tidak terdaftar di jadwal training ini.', 403);
    }

    const skip = (page - 1) * limit;

    const { data, total } = await myTrainingRepository.getParticipantsByJadwalTrainingId(
        jadwalTrainingId, skip, limit, search,
    );

    const totalPages = Math.ceil(total / limit);

    const results = data.map((item) => {
        const { password, penilaian, ...safeUser } = item as any;
        const p = penilaian?.[0] ?? null;

        return {
            ...safeUser,
            pesertaTraining: item.pesertaTraining,
            profilPeserta: item.profilPeserta,
            penilaianId: p?.id ?? null,
            statusKompetensi: p?.statusKompetensi ?? null,
            catatan: p?.catatan ?? null,
        };
    });

    return {
        results,
        pagination: {
            total,
            totalPages,
            currentPage: page,
            limit,
            hasNext: page < totalPages,
            hasPrevious: page > 1,
        },
        instruktur: instruktur.length === 1 ? instruktur[0] : instruktur,
        asesor: asesor.length === 1 ? asesor[0] : asesor,
    };
};
