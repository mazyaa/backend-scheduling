export const generateSingkatanMateri = (namaMateri: string): string => {
  // Remove non-alphanumeric characters except spaces
  const cleanString = namaMateri.replace(/[^a-zA-Z0-9\s]/g, '');
  // Split by space, filter empty strings, take first letter of each word, uppercase
  const words = cleanString.split(/\s+/).filter(word => word.length > 0);
  
  if (words.length === 1) {
    // If only one word, take the first 3 letters or less
    return words[0].substring(0, 3).toUpperCase();
  }

  return words.map(word => word[0].toUpperCase()).join('');
};

export const romanizeMonth = (monthIndex: number): string => {
  const romanMonths = [
    'I', 'II', 'III', 'IV', 'V', 'VI',
    'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
  ];
  return romanMonths[monthIndex] || 'I';
};

export const generateNomorSertifikat = (
  urutan: number,
  namaMateri: string,
  date: Date
): string => {
  const paddedUrutan = urutan.toString().padStart(3, '0');
  const singkatan = generateSingkatanMateri(namaMateri);
  const monthRoman = romanizeMonth(date.getMonth());
  const year = date.getFullYear();

  // Format: {Nomor Urut}/e/Sertifikat/{Singkatan Materi}/{Bulan}/{Tahun}
  // Contoh: 007/e/Sertifikat/PK3L/V/2026
  return `${paddedUrutan}/e/Sertifikat/${singkatan}/${monthRoman}/${year}`;
};
