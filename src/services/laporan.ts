import * as laporanRepository from '../repositories/laporan';

export const getLaporanSertifikat = async (payload: {
    page: number;
    limit: number;
    search?: string;
    batch?: string;
}) => {
    const { page, limit, search, batch } = payload;

    /**
     * Build where clause
     */
    const where: any = {};

    if (search?.trim() || batch?.trim()) {
        where.penilaian = {};

        if (batch?.trim()) {
            where.penilaian.jadwalTraining = {
                batch: { contains: batch.trim(), mode: 'insensitive' },
            };
        }

        if (search?.trim()) {
            where.penilaian.jadwalTraining = {
                ...where.penilaian.jadwalTraining,
                training: {
                    namaTraining: { contains: search.trim(), mode: 'insensitive' },
                },
            };
        }
    }

    /**
     * Query all matching sertifikat
     */
    const allSertifikat = await laporanRepository.getSertifikatWithJadwal(where);

    /**
     * Group by jadwalTrainingId
     */
    const grouped: Record<string, {
        id: string;
        namaTraining: string;
        batch: string;
        totalSertifikat: number;
    }> = {};

    for (const sertifikat of allSertifikat) {
        const jt = sertifikat.penilaian.jadwalTraining;
        const key = jt.id;

        if (!grouped[key]) {
            grouped[key] = {
                id: key,
                namaTraining: jt.training.namaTraining,
                batch: jt.batch,
                totalSertifikat: 0,
            };
        }

        grouped[key].totalSertifikat++;
    }

    /**
     * Convert to array
     */
    const allData = Object.values(grouped);

    /**
     * Apply pagination on grouped results
     */
    const total = allData.length;
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const data = allData.slice(skip, skip + limit);

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

export const getLaporanPeserta = async (payload: {
    page: number;
    limit: number;
    search?: string;
    batch?: string;
    status?: string;
}) => {
    const { page, limit, search, batch, status } = payload;

    /**
     * Build where clause
     */
    const where: any = {};

    if (search?.trim()) {
        where.user = {
            name: { contains: search.trim(), mode: 'insensitive' },
        };
    }

    if (batch?.trim()) {
        where.jadwalTraining = {
            ...where.jadwalTraining,
            batch: { contains: batch.trim(), mode: 'insensitive' },
        };
    }

    if (status?.trim()) {
        where.statusKompetensi = status.trim();
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        laporanRepository.getPesertaLaporan(where, skip, limit),
        laporanRepository.countPesertaLaporan(where),
    ]);

    const totalPages = Math.ceil(total / limit);

    const mappedData = data.map((item) => ({
        id: item.id,
        namaPeserta: item.user.name,
        namaTraining: item.jadwalTraining.training.namaTraining,
        batch: item.jadwalTraining.batch,
        statusKompetensi: item.statusKompetensi,
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
