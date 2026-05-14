export const participantImportHelper = {
  sanitizeNoWa: (noWa: string | null | undefined): string | null => {
    if (!noWa) return null;
    let clean = noWa.replace(/\D/g, '');
    if (clean.startsWith('62')) {
      clean = '0' + clean.substring(2);
    }
    return clean;
  },

  isRowEmpty: (mappedRow: any): boolean => {
    const fieldsToCheck = [
      'email', 'name', 'noWa', 'instansi', 'fileCv', 
      'fileIjazah', 'fileSuratRekomendasi', 'fileKtp', 
      'fileFoto', 'fileBuktiBayar', 'fileBuktiFollow'
    ];
    return fieldsToCheck.every(key => {
      const val = mappedRow[key];
      return val === null || val === undefined || val === '';
    });
  }
};
