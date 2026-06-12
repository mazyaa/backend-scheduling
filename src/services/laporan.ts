import { calculateEndDate } from '../utils/helper';
import * as laporanRepository from '../repositories/laporan';

export const getLaporanSertifikat = async (payload: {
  page: number;
  limit: number;
  search?: string;
  batch?: string;
  tahun?: number;
}) => {
  const { page, limit, search, batch, tahun } = payload;

  const where: any = {};

  if (search?.trim() || batch?.trim() || tahun) {
    where.jadwalTraining = {};

    if (batch?.trim()) {
      where.jadwalTraining.batch = { contains: batch.trim(), mode: 'insensitive' };
    }

    if (search?.trim()) {
      where.jadwalTraining.training = {
        namaTraining: { contains: search.trim(), mode: 'insensitive' },
      };
    }

    if (tahun) {
      where.jadwalTraining.startDate = {
        gte: new Date(tahun, 0, 1),
        lt: new Date(tahun + 1, 0, 1),
      };
    }
  }

  const allPenilaian = await laporanRepository.getPenilaianWithJadwal(where, 0, 999999);

  const grouped: Record<string, any> = {};

  for (const p of allPenilaian) {
    const jt = p.jadwalTraining;
    const key = jt.id;

    if (!grouped[key]) {
      grouped[key] = {
        id: key,
        namaTraining: jt.training.namaTraining,
        batch: jt.batch,
        startDate: jt.startDate.toISOString().split('T')[0],
        endDate: calculateEndDate(jt.startDate, jt.duration),
        totalPeserta: jt._count.pesertaTraining,
        totalSertifikatTerbit: 0,
        totalBelumTerbit: 0,
        peserta: [],
      };
    }

    const entry = grouped[key];

    entry.peserta.push({
      namaPeserta: p.user.name,
      email: p.user.email,
      statusKompetensi: p.statusKompetensi,
      nomorSertifikat: p.sertifikat.length > 0 ? p.sertifikat[0].nomorSertifikat : null,
      fileSertifikat: p.sertifikat.length > 0 ? p.sertifikat[0].fileSertifikat : null,
      statusRevisi: p.revisiFile?.status ?? null,
    });

    if (p.sertifikat.length > 0) {
      entry.totalSertifikatTerbit++;
    }
  }

  for (const key of Object.keys(grouped)) {
    grouped[key].totalBelumTerbit = grouped[key].totalPeserta - grouped[key].totalSertifikatTerbit;
  }

  const allData = Object.values(grouped);
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
  tahun?: number;
}) => {
  const { page, limit, search, batch, status, tahun } = payload;

  const where: any = {};

  if (search?.trim()) {
    where.user = {
      name: { contains: search.trim(), mode: 'insensitive' },
    };
  }

  if (status?.trim()) {
    where.statusKompetensi = status.trim();
  }

  if (batch?.trim() || tahun) {
    where.jadwalTraining = {
      ...where.jadwalTraining,
    };

    if (batch?.trim()) {
      where.jadwalTraining.batch = { contains: batch.trim(), mode: 'insensitive' };
    }

    if (tahun) {
      where.jadwalTraining.startDate = {
        gte: new Date(tahun, 0, 1),
        lt: new Date(tahun + 1, 0, 1),
      };
    }
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
    email: item.user.email,
    noWa: item.user.noWa,
    instansi: item.user.profilPeserta?.instansi ?? null,
    namaTraining: item.jadwalTraining.training.namaTraining,
    batch: item.jadwalTraining.batch,
    startDate: item.jadwalTraining.startDate.toISOString().split('T')[0],
    endDate: calculateEndDate(item.jadwalTraining.startDate, item.jadwalTraining.duration),
    statusKompetensi: item.statusKompetensi,
    catatan: item.catatan,
    statusRevisi: item.revisiFile?.status ?? null,
    createdAt: item.createdAt,
    sertifikat: item.sertifikat.map((s) => ({
      nomorSertifikat: s.nomorSertifikat,
      fileSertifikat: s.fileSertifikat,
      judulMateri: s.materiTraining.judul,
      createdAt: s.createdAt,
    })),
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
