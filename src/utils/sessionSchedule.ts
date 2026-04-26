type PicType = "MC" | "Instruktur" | "Asesor" | null;
type SessionTemplate = {
  jamMulai: string;
  jamSelesai: string;
  aktivitas: string;
  pic: PicType;
};

export const REGULAR_DAY_TEMPLATE: SessionTemplate[] = [
  { jamMulai: "07:00", jamSelesai: "07:30", aktivitas: "Persiapan / Zoom Dibuka", pic: "MC" },
  { jamMulai: "07:30", jamSelesai: "08:00", aktivitas: "Pembukaan", pic: "MC" },
  { jamMulai: "08:00", jamSelesai: "09:45", aktivitas: "Materi 1", pic: "Instruktur" },
  { jamMulai: "09:45", jamSelesai: "10:00", aktivitas: "Break", pic: null },
  { jamMulai: "10:00", jamSelesai: "11:45", aktivitas: "Materi 2", pic: "Instruktur" },
  { jamMulai: "12:00", jamSelesai: "13:15", aktivitas: "ISHOMA", pic: null },
  { jamMulai: "13:15", jamSelesai: "14:45", aktivitas: "Materi 3", pic: "Instruktur" },
  { jamMulai: "14:45", jamSelesai: "15:55", aktivitas: "Materi 4", pic: "Instruktur" },
  { jamMulai: "15:55", jamSelesai: "16:30", aktivitas: "Penutupan", pic: "MC" },
];

export const EXAM_DAY_TEMPLATE: SessionTemplate[] = [
  { jamMulai: "08:30", jamSelesai: "08:45", aktivitas: "Persiapan / Zoom Dibuka", pic: "MC" },
  { jamMulai: "08:45", jamSelesai: "09:00", aktivitas: "Pembukaan", pic: "MC" },
  { jamMulai: "09:00", jamSelesai: "12:00", aktivitas: "Uji Kompetensi", pic: "Asesor" },
];