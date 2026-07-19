export const participantImportHelper = {
  sanitizeNoWa: (noWa: string | null | undefined): string | null => {
    if (!noWa) return null;
    let clean = noWa.replace(/\D/g, ''); // Remove non-digit characters
    // 08123456789 -> 628123456789
    if (clean.startsWith('0')) {
      clean = '62' + clean.slice(1);
      // 8123456789 -> 628123456789
    } else if (clean.startsWith("8")) {
      clean = "62" + clean;
    } else {
      return null; // Invalid format
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
