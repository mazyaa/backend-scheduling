import { participantImportHelper } from './participantImportHelper';

function findColumnValue(row: Record<string, any>, keywords: string[]): string | null {
  const headerKeys = Object.keys(row);
  for (const keyword of keywords) {
    const match = headerKeys.find((key) =>
      key.toLowerCase().includes(keyword.toLowerCase()),
    );
    if (match) {
      return row[match]?.toString().trim() ?? null;
    }
  }
  return null;
}

export function mapRowToPayload(row: Record<string, any>, rowNumber: number) {
  const payload = {
    _rowNumber: rowNumber,
    email: findColumnValue(row, ['email']),
    name: findColumnValue(row, ['nama lengkap', 'nama']),
    noWa: participantImportHelper.sanitizeNoWa(
      findColumnValue(row, ['no hp', 'no_wa', 'no wa', 'nomor hp', 'nomor telepon', 'telepon', 'hp']),
    ),
    instansi: findColumnValue(row, ['perusahaan', 'instansi', 'umum']),
    fileCv: findColumnValue(row, ['cv']),
    fileIjazah: findColumnValue(row, ['ijazah']),
    fileSuratRekomendasi: findColumnValue(row, ['rekomendasi']),
    fileKtp: findColumnValue(row, ['scan ktp', 'ktp']),
    fileFoto: findColumnValue(row, ['foto background', 'background merah', 'foto']),
    fileBuktiBayar: findColumnValue(row, ['bukti pembayaran', 'pembayaran', 'bayar']),
    fileBuktiFollow: findColumnValue(row, ['follow ig', 'follow @', 'bukti follow', 'ig']),
  };

  const isEmpty = participantImportHelper.isRowEmpty(payload);

  return { ...payload, _isEmpty: isEmpty };
}
