import "dotenv/config";
import { prisma } from '../client';
import bcrypt from 'bcrypt';
import { RoleUser, StatusKompetensi, StatusRevisi } from '@prisma/client';
import { ICreateUser } from '../interfaces';
import {
    ADMIN_EMAIL,
    ADMIN_NOWA,
    ADMIN_PASSWORD,
    PESERTA_EMAIL,
    PESERTA_NOWA,
    PESERTA_PASSWORD,
    INSTRUKTUR_EMAIL,
    INSTRUKTUR_NOWA,
    INSTRUKTUR_PASSWORD,
    ASESOR_EMAIL,
    ASESOR_NOWA,
    ASESOR_PASSWORD,
    DIREKTUR_EMAIL,
    DIREKTUR_NOWA,
    DIREKTUR_PASSWORD,
} from '../env';

const hashPassword = async (pw: string) => await bcrypt.hash(pw, 10);
const SEED_PASSWORD = 'password123';
const SEED_DOMAIN = '@seed.com';
const DURATION = 4;

function timeToDate(time: string): Date {
    return new Date(`1970-01-01T${time}:00.000Z`);
}

async function seedUsers() {
    const users: ICreateUser[] = [
        {
            name: 'Admin',
            image: null,
            email: ADMIN_EMAIL,
            noWa: ADMIN_NOWA,
            role: RoleUser.admin,
            password: await hashPassword(ADMIN_PASSWORD),
        },
        {
            name: 'Peserta',
            image: 'https://res.cloudinary.com/dfu2sm1dv/image/upload/v1773504142/engineer_fxk5ta.png',
            email: PESERTA_EMAIL,
            noWa: PESERTA_NOWA,
            role: RoleUser.peserta,
            password: await hashPassword(PESERTA_PASSWORD),
        },
        {
            name: 'Instruktur',
            image: 'https://res.cloudinary.com/dfu2sm1dv/image/upload/v1773504142/engineer_fxk5ta.png',
            email: INSTRUKTUR_EMAIL,
            noWa: INSTRUKTUR_NOWA,
            role: RoleUser.instruktur,
            password: await hashPassword(INSTRUKTUR_PASSWORD),
            keahlian: 'HSE DEVELOPMENT',
        },
        {
            name: 'Asesor',
            image: 'https://res.cloudinary.com/dfu2sm1dv/image/upload/v1773504142/engineer_fxk5ta.png',
            email: ASESOR_EMAIL,
            noWa: ASESOR_NOWA,
            role: RoleUser.asesor,
            password: await hashPassword(ASESOR_PASSWORD),
            keahlian: 'JSA',
        },
        {
            name: 'Direktur',
            image: null,
            email: DIREKTUR_EMAIL,
            noWa: DIREKTUR_NOWA,
            role: RoleUser.direktur,
            password: await hashPassword(DIREKTUR_PASSWORD),
        },
    ];

    for (const user of users) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: user,
        });
    }

    console.log('✓ Users seeded');
}

async function seedDummyData() {
    const pw = await hashPassword(SEED_PASSWORD);

    // Cleanup
    const trainingNames = ['AK3U BNSP', 'POPAL BNSP', 'POP PERTAMBANGAN BNSP'];
    await prisma.training.deleteMany({ where: { namaTraining: { in: trainingNames } } });
    await prisma.user.deleteMany({ where: { email: { endsWith: SEED_DOMAIN } } });
    console.log('✓ Cleanup done');

    // --- Training ---
    const trainingData = [
        {
            namaTraining: 'AK3U BNSP',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
            description: 'Ahli K3 Umum BNSP - Pelatihan dan Sertifikasi Ahli Keselamatan dan Kesehatan Kerja Umum yang diakui oleh BNSP',
        },
        {
            namaTraining: 'POPAL BNSP',
            image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=400',
            description: 'Pengawas Operasional Ahli Lingkungan BNSP - Pelatihan dan Sertifikasi Pengawas Operasional di bidang Lingkungan',
        },
        {
            namaTraining: 'POP PERTAMBANGAN BNSP',
            image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400',
            description: 'Pengawas Operasional Pertambangan BNSP - Pelatihan dan Sertifikasi Pengawas Operasional di bidang Pertambangan',
        },
    ];

    const createdTrainings: any[] = [];
    for (const t of trainingData) {
        const created = await prisma.training.create({ data: t });
        createdTrainings.push(created);
    }
    console.log('✓ 3 Training created');

    // --- 5 Instruktur ---
    const instrukturData = [
        { name: 'Bambang Supriyadi', keahlian: 'K3 Umum & HSE' },
        { name: 'Dewi Sartika', keahlian: 'Keselamatan Kerja' },
        { name: 'Eko Prasetyo', keahlian: 'Lingkungan Hidup' },
        { name: 'Fitri Handayani', keahlian: 'Pertambangan' },
        { name: 'Gunawan Wibisono', keahlian: 'Sistem Manajemen K3' },
    ];
    const createdInstrukturs: any[] = [];
    for (let i = 0; i < instrukturData.length; i++) {
        const d = instrukturData[i];
        const user = await prisma.user.create({
            data: {
                name: d.name,
                image: `https://i.pravatar.cc/150?u=instruktur${i + 1}${SEED_DOMAIN}`,
                email: `instruktur${i + 1}${SEED_DOMAIN}`,
                noWa: `081111000${i + 1}`,
                role: RoleUser.instruktur,
                password: pw,
                keahlian: d.keahlian,
            },
        });
        createdInstrukturs.push(user);
    }
    console.log('✓ 5 Instruktur created');

    // --- 5 Asesor ---
    const asesorData = [
        { name: 'Hendra Kusuma', keahlian: 'Kompetensi AK3U' },
        { name: 'Indah Permata Sari', keahlian: 'Kompetensi POPAL' },
        { name: 'Joko Susilo', keahlian: 'Kompetensi POP' },
        { name: 'Kartika Dewi', keahlian: 'Audit K3' },
        { name: 'Lukman Hakim', keahlian: 'Sertifikasi BNSP' },
    ];
    const createdAsesors: any[] = [];
    for (let i = 0; i < asesorData.length; i++) {
        const d = asesorData[i];
        const user = await prisma.user.create({
            data: {
                name: d.name,
                image: `https://i.pravatar.cc/150?u=asesor${i + 1}${SEED_DOMAIN}`,
                email: `asesor${i + 1}${SEED_DOMAIN}`,
                noWa: `082222000${i + 1}`,
                role: RoleUser.asesor,
                password: pw,
                keahlian: d.keahlian,
            },
        });
        createdAsesors.push(user);
    }
    console.log('✓ 5 Asesor created');

    // --- Jadwal Training (3) ---
    const jadwalConfigs = [
        { trainingIndex: 0, startDate: new Date('2025-01-15'), batch: 'Batch 1', meetingLink: 'https://meet.google.com/ak3u-bnsp' },
        { trainingIndex: 1, startDate: new Date('2025-02-10'), batch: 'Batch 1', meetingLink: 'https://meet.google.com/popal-bnsp' },
        { trainingIndex: 2, startDate: new Date('2025-03-05'), batch: 'Batch 1', meetingLink: 'https://meet.google.com/pop-pertambangan' },
    ];

    const createdJadwals: any[] = [];

    for (let j = 0; j < jadwalConfigs.length; j++) {
        const cfg = jadwalConfigs[j];
        const jadwal = await prisma.jadwalTraining.create({
            data: {
                trainingId: createdTrainings[cfg.trainingIndex].id,
                startDate: cfg.startDate,
                duration: DURATION,
                batch: cfg.batch,
                meetingLink: cfg.meetingLink,
            },
        });

        const detailJadwals: any[] = [];
        for (let hari = 0; hari < DURATION; hari++) {
            const hariDate = new Date(cfg.startDate);
            hariDate.setDate(hariDate.getDate() + hari);

            const instruktur = createdInstrukturs[hari % 5];
            const asesor = createdAsesors[hari % 5];

            const detail = await prisma.detailJadwalTraining.create({
                data: {
                    jadwalTrainingId: jadwal.id,
                    hari: hariDate,
                    hariKe: hari + 1,
                    instrukturId: instruktur.id,
                    asesorId: asesor.id,
                },
            });
            detailJadwals.push(detail);
        }

        const sesiTemplates = [
            { jamMulai: '08:00', jamSelesai: '10:00', aktivitas: 'Materi Sesi 1', pic: 'Instruktur' },
            { jamMulai: '10:15', jamSelesai: '12:15', aktivitas: 'Materi Sesi 2', pic: 'Instruktur' },
            { jamMulai: '13:00', jamSelesai: '15:00', aktivitas: 'Praktik / Studi Kasus', pic: 'Instruktur' },
            { jamMulai: '15:15', jamSelesai: '17:00', aktivitas: 'Diskusi & Tanya Jawab', pic: 'Asesor' },
        ];

        for (const detail of detailJadwals) {
            for (const sesi of sesiTemplates) {
                await prisma.sesiJadwalTraining.create({
                    data: {
                        detailJadwalTrainingId: detail.id,
                        jamMulai: timeToDate(sesi.jamMulai),
                        jamSelesai: timeToDate(sesi.jamSelesai),
                        aktivitas: sesi.aktivitas,
                        pic: sesi.pic,
                    },
                });
            }
        }

        createdJadwals.push({ jadwal, detailJadwals });
    }
    console.log('✓ 3 Jadwal + 12 Detail + 48 Sesi created');

    // --- 30 Peserta (10 per training) ---
    const pesertaGroup = [
        ['Ahmad Fauzi', 'Budi Santoso', 'Citra Lestari', 'Deni Ramdani', 'Elisa Putri', 'Fajar Nugroho', 'Gita Puspita', 'Hadi Susilo', 'Intan Permata', 'Joko Widodo'],
        ['Karina Ayu', 'Leo Prasetyo', 'Mega Sari', 'Nanda Firmansyah', 'Olivia Dewi', 'Prabowo Setiawan', 'Qori Amalia', 'Rudi Hartono', 'Sari Indah', 'Teguh Pratama'],
        ['Umi Kalsum', 'Viktor Mandala', 'Wulan Dari', 'Xaverius Manik', 'Yuni Astuti', 'Zainal Abidin', 'Agung Permana', 'Bella Safira', 'Cahyo Nugroho', 'Dian Rahmawati'],
    ];

    for (let t = 0; t < 3; t++) {
        const group = pesertaGroup[t];
        for (let p = 0; p < group.length; p++) {
            const index = t * 10 + p + 1;
            const email = `peserta${index}${SEED_DOMAIN}`;

            const user = await prisma.user.create({
                data: {
                    name: group[p],
                    image: `https://i.pravatar.cc/150?u=${email}`,
                    email,
                    noWa: `083333000${String(index).padStart(2, '0')}`,
                    role: RoleUser.peserta,
                    password: pw,
                },
            });

            await prisma.profilPeserta.create({
                data: {
                    userId: user.id,
                    instansi: `Perusahaan ${String.fromCharCode(65 + (index % 26))}`,
                    fileCv: '/uploads/seed/dummy-cv.pdf',
                    fileIjazah: '/uploads/seed/dummy-ijazah.pdf',
                    fileSuratRekomendasi: '/uploads/seed/dummy-rekomendasi.pdf',
                    fileKtp: '/uploads/seed/dummy-ktp.pdf',
                    fileFoto: `https://i.pravatar.cc/150?u=${email}`,
                    fileBuktiBayar: '/uploads/seed/dummy-bukti-bayar.pdf',
                    fileBuktiFollow: '/uploads/seed/dummy-bukti-follow.pdf',
                },
            });

            await prisma.pesertaTraining.create({
                data: {
                    userId: user.id,
                    jadwalTrainingId: createdJadwals[t].jadwal.id,
                },
            });
        }
    }
    console.log('✓ 30 Peserta + ProfilPeserta + PesertaTraining created');

    // --- 6 Materi per jadwal training ---
    const materiGroups = [
        [
            { judul: 'Dasar-dasar K3', hariKe: 1 },
            { judul: 'Peraturan Perundangan K3', hariKe: 1 },
            { judul: 'Identifikasi Bahaya & Risk Assessment', hariKe: 2 },
            { judul: 'Pencegahan Kecelakaan Kerja', hariKe: 2 },
            { judul: 'Tanggap Darurat & P3K', hariKe: 3 },
            { judul: 'Sistem Manajemen K3', hariKe: 4 },
        ],
        [
            { judul: 'Dasar-dasar Lingkungan Hidup', hariKe: 1 },
            { judul: 'Peraturan Lingkungan Hidup', hariKe: 1 },
            { judul: 'AMDAL & UKL-UPL', hariKe: 2 },
            { judul: 'Pengelolaan Limbah', hariKe: 2 },
            { judul: 'Audit Lingkungan', hariKe: 3 },
            { judul: 'Sistem Manajemen Lingkungan', hariKe: 4 },
        ],
        [
            { judul: 'Dasar-dasar Pertambangan', hariKe: 1 },
            { judul: 'Peraturan Pertambangan', hariKe: 1 },
            { judul: 'Teknik Penambangan', hariKe: 2 },
            { judul: 'Keselamatan Pertambangan', hariKe: 2 },
            { judul: 'Reklamasi & Pascatambang', hariKe: 3 },
            { judul: 'Sistem Manajemen Pertambangan', hariKe: 4 },
        ],
    ];

    for (let t = 0; t < 3; t++) {
        const detailJadwals = createdJadwals[t].detailJadwals;
        for (const m of materiGroups[t]) {
            const detailJadwal = detailJadwals[m.hariKe - 1];
            await prisma.materiTraining.create({
                data: {
                    detailJadwalTrainingId: detailJadwal.id,
                    judul: m.judul,
                    fileMateri: '/uploads/seed/dummy-materi.pdf',
                    diuploadOleh: createdInstrukturs[t % 5].id,
                },
            });
        }
    }
    console.log('✓ 18 MateriTraining created');

    // --- Penilaian + Sertifikat + RevisiFile ---
    // 70% kompeten (21), 30% belum_kompeten (9)
    const kompetenPerTraining = 7;

    for (let t = 0; t < 3; t++) {
        const jadwalId = createdJadwals[t].jadwal.id;

        const materiRecords = await prisma.materiTraining.findMany({
            where: {
                detailJadwalTrainingId: { in: createdJadwals[t].detailJadwals.map((d: any) => d.id) },
            },
            orderBy: { createdAt: 'asc' },
        });

        const pesertaTrainings = await prisma.pesertaTraining.findMany({
            where: { jadwalTrainingId: jadwalId },
            include: { user: true },
        });

        const catatans = [
            'Peserta aktif dan menguasai materi dengan baik',
            'Peserta memiliki pemahaman yang baik terhadap materi',
            'Peserta cukup aktif dalam diskusi kelompok',
            'Peserta perlu meningkatkan pemahaman praktek lapangan',
            'Peserta masih kurang dalam penguasaan materi teori',
        ];

        for (let p = 0; p < pesertaTrainings.length; p++) {
            const pt = pesertaTrainings[p];
            const isKompeten = p < kompetenPerTraining;
            const status = isKompeten ? StatusKompetensi.kompeten : StatusKompetensi.belum_kompeten;

            const penilaian = await prisma.penilaian.create({
                data: {
                    userId: pt.userId,
                    jadwalTrainingId: jadwalId,
                    statusKompetensi: status,
                    catatan: catatans[p % catatans.length],
                },
            });

            if (isKompeten) {
                for (let m = 0; m < materiRecords.length; m++) {
                    const nomor = `SKT/${String(t + 1).padStart(2, '0')}/${String(p + 1).padStart(2, '0')}/${String(m + 1).padStart(2, '0')}`;
                    await prisma.sertifikat.create({
                        data: {
                            penilaianId: penilaian.id,
                            materiTrainingId: materiRecords[m].id,
                            nomorSertifikat: nomor,
                            fileSertifikat: '/uploads/seed/dummy-sertifikat.pdf',
                        },
                    });
                }

                if (p < 2) {
                    await prisma.revisiFile.create({
                        data: {
                            penilaianId: penilaian.id,
                            fileRevisiAdmin: '/uploads/seed/dummy-revisi-admin.pdf',
                            fileRevisiPeserta: '/uploads/seed/dummy-revisi-peserta.pdf',
                            status: StatusRevisi.disetujui,
                        },
                    });
                }
            } else {
                if (p < kompetenPerTraining + 1) {
                    await prisma.revisiFile.create({
                        data: {
                            penilaianId: penilaian.id,
                            fileRevisiAdmin: '/uploads/seed/dummy-revisi-admin.pdf',
                            status: StatusRevisi.pending,
                        },
                    });
                } else if (p < kompetenPerTraining + 2) {
                    await prisma.revisiFile.create({
                        data: {
                            penilaianId: penilaian.id,
                            fileRevisiAdmin: '/uploads/seed/dummy-revisi-admin.pdf',
                            fileRevisiPeserta: '/uploads/seed/dummy-revisi-peserta.pdf',
                            status: StatusRevisi.ditolak,
                        },
                    });
                }
            }
        }
    }
    console.log('✓ 30 Penilaian + 126 Sertifikat + RevisiFile created');
}

async function main(): Promise<void> {
    try {
        await seedUsers();
        await seedDummyData();
        console.log('\n✅ All seed data created successfully!');
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
