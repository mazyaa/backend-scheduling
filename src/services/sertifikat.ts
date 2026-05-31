import { HttpError } from '../utils/error';
import * as sertifikatRepository from '../repositories/sertifikat';

export const verifySertifikat = async (nomorSertifikat: string) => {
    if (!nomorSertifikat?.trim()) {
        throw new HttpError('Nomor sertifikat harus diisi.', 400);
    }

    const sertifikat = await sertifikatRepository.getSertifikatByNomor(
        nomorSertifikat.trim(),
    );

    if (!sertifikat) {
        throw new HttpError('Sertifikat tidak ditemukan.', 404);
    }

    const user = sertifikat.penilaian.user;
    const jt = sertifikat.penilaian.jadwalTraining;

    return {
        namaLengkap: user.name,
        email: user.email,
        noHp: user.noWa,
        training: jt.training.namaTraining,
        instansi: null,
        batch: jt.batch,
        nomorSertifikat: sertifikat.nomorSertifikat,
        materi: sertifikat.materiTraining.judul,
        tanggalTerbit: sertifikat.createdAt,
    };
};
