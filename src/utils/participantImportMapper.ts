import { participantImportHelper } from './participantImportHelper';

export const IMPORT_HEADERS = {
  EMAIL: 'Email Address',
  NAMA_LENGKAP: 'Nama Lengkap',
  NO_HP: 'No HP',
  INSTANSI: 'Perusahaan/Instansi/Umum',
  CV: 'CV',
  IJAZAH: 'Scan Ijazah Terakhir (Min SMA/SMK/Sederajat)',
  SURAT_REKOMENDASI: 'Surat Rekomendasi dari Perusahaan (Jika ada)',
  KTP: 'Scan KTP',
  FOTO: 'Foto Background Merah',
  BUKTI_BAYAR: 'Bukti pembayaran',
  BUKTI_FOLLOW: 'Bukti Follow IG @veritrustacademy',
} as const;

export function mapRowToPayload(row: Record<string, any>, rowNumber: number) {
  const payload = {
    _rowNumber: rowNumber,
    email: row[IMPORT_HEADERS.EMAIL]?.toString().trim() ?? null,
    name: row[IMPORT_HEADERS.NAMA_LENGKAP]?.toString().trim() ?? null,
    noWa: participantImportHelper.sanitizeNoWa(row[IMPORT_HEADERS.NO_HP]?.toString().trim()),
    instansi: row[IMPORT_HEADERS.INSTANSI]?.toString().trim() ?? null,
    fileCv: row[IMPORT_HEADERS.CV]?.toString().trim() ?? null,
    fileIjazah: row[IMPORT_HEADERS.IJAZAH]?.toString().trim() ?? null,
    fileSuratRekomendasi: row[IMPORT_HEADERS.SURAT_REKOMENDASI]?.toString().trim() ?? null,
    fileKtp: row[IMPORT_HEADERS.KTP]?.toString().trim() ?? null,
    fileFoto: row[IMPORT_HEADERS.FOTO]?.toString().trim() ?? null,
    fileBuktiBayar: row[IMPORT_HEADERS.BUKTI_BAYAR]?.toString().trim() ?? null,
    fileBuktiFollow: row[IMPORT_HEADERS.BUKTI_FOLLOW]?.toString().trim() ?? null,
  };

  const isEmpty = participantImportHelper.isRowEmpty(payload);

  return { ...payload, _isEmpty: isEmpty };
}
