type SessionTemplateByDay = {
  [day: number]: { jamMulai: Date; jamSelesai: Date; aktivitas: string }[];
};

// helper convert "HH:mm" -> Date
const toDate = (time: string): Date => {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export const SESSION_TEMPLATE_BY_DAY: SessionTemplateByDay = {
  1: [
    { jamMulai: toDate("07:00"), jamSelesai: toDate("08:00"), aktivitas: "Persiapan / Zoom Dibuka" },
    { jamMulai: toDate("08:15"), jamSelesai: toDate("09:45"), aktivitas: "Materi 1" },
    { jamMulai: toDate("09:45"), jamSelesai: toDate("10:00"), aktivitas: "Break" },
    { jamMulai: toDate("10:00"), jamSelesai: toDate("11:15"), aktivitas: "Materi 2" },
    { jamMulai: toDate("12:00"), jamSelesai: toDate("13:00"), aktivitas: "ISHOMA" },
    { jamMulai: toDate("13:15"), jamSelesai: toDate("15:00"), aktivitas: "Materi 3" },
    { jamMulai: toDate("15:30"), jamSelesai: toDate("16:30"), aktivitas: "Penutupan" }
  ],

  2: [
    { jamMulai: toDate("07:00"), jamSelesai: toDate("07:30"), aktivitas: "Persiapan / Zoom Dibuka" },
    { jamMulai: toDate("07:30"), jamSelesai: toDate("08:00"), aktivitas: "Pembukaan" },
    { jamMulai: toDate("08:00"), jamSelesai: toDate("09:45"), aktivitas: "Materi 1" },
    { jamMulai: toDate("09:45"), jamSelesai: toDate("10:00"), aktivitas: "Break" },
    { jamMulai: toDate("10:00"), jamSelesai: toDate("11:45"), aktivitas: "Materi 2" },
    { jamMulai: toDate("12:00"), jamSelesai: toDate("13:15"), aktivitas: "ISHOMA" },
    { jamMulai: toDate("13:15"), jamSelesai: toDate("14:45"), aktivitas: "Materi 3" },
    { jamMulai: toDate("14:45"), jamSelesai: toDate("15:55"), aktivitas: "Materi 4" },
    { jamMulai: toDate("15:55"), jamSelesai: toDate("16:30"), aktivitas: "Penutupan" }
  ],

  3: [
    { jamMulai: toDate("07:00"), jamSelesai: toDate("07:30"), aktivitas: "Persiapan / Zoom Dibuka" },
    { jamMulai: toDate("07:30"), jamSelesai: toDate("08:00"), aktivitas: "Pembukaan" },
    { jamMulai: toDate("08:00"), jamSelesai: toDate("09:30"), aktivitas: "Materi 1" },
    { jamMulai: toDate("09:30"), jamSelesai: toDate("10:45"), aktivitas: "Materi 2" },
    { jamMulai: toDate("10:45"), jamSelesai: toDate("11:00"), aktivitas: "Break" },
    { jamMulai: toDate("11:00"), jamSelesai: toDate("12:00"), aktivitas: "Diskusi & Pembahasan" },
    { jamMulai: toDate("13:00"), jamSelesai: toDate("14:15"), aktivitas: "Materi 3" },
    { jamMulai: toDate("14:15"), jamSelesai: toDate("15:45"), aktivitas: "Materi 4" },
    { jamMulai: toDate("15:45"), jamSelesai: toDate("16:30"), aktivitas: "Penutupan" }
  ],

  4: [
    { jamMulai: toDate("08:30"), jamSelesai: toDate("08:45"), aktivitas: "Persiapan / Zoom Dibuka" },
    { jamMulai: toDate("08:45"), jamSelesai: toDate("09:00"), aktivitas: "Pembukaan" },
    { jamMulai: toDate("09:00"), jamSelesai: toDate("12:00"), aktivitas: "Uji Kompetensi" }
  ]
};