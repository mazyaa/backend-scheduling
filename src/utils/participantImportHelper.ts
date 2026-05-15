export const participantImportHelper = {
  sanitizeNoWa: (noWa: string | null | undefined): string | null => {
    if (!noWa) return null;
    let clean = noWa.replace(/\D/g, ''); // Remove non-digit characters
    if (clean.startsWith('0')) {
      clean = '62' + clean.substring(2);
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
      return val === null || val === undefined || val === ''; // if all fields are null, undefined, or empty string, consider the row empty
    });
  }
};
