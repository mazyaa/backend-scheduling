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

const hashedPassword = async (pw: string) => await bcrypt.hash(pw, 10);

async function seedUsers() {
    const users: ICreateUser[] = [
        {
            name: 'Admin',
            image: null,
            email: ADMIN_EMAIL,
            noWa: ADMIN_NOWA,
            role: RoleUser.admin,
            password: await hashedPassword(ADMIN_PASSWORD),
        },
        {
            name: 'Peserta',
            image: 'https://res.cloudinary.com/dfu2sm1dv/image/upload/v1773504142/engineer_fxk5ta.png',
            email: PESERTA_EMAIL,
            noWa: PESERTA_NOWA,
            role: RoleUser.peserta,
            password: await hashedPassword(PESERTA_PASSWORD),
        },
        {
            name: 'Instruktur',
            image: 'https://res.cloudinary.com/dfu2sm1dv/image/upload/v1773504142/engineer_fxk5ta.png',
            email: INSTRUKTUR_EMAIL,
            noWa: INSTRUKTUR_NOWA,
            role: RoleUser.instruktur,
            password: await hashedPassword(INSTRUKTUR_PASSWORD),
            keahlian: 'HSE DEVELOPMENT',
        },
        {
            name: 'Asesor',
            image: 'https://res.cloudinary.com/dfu2sm1dv/image/upload/v1773504142/engineer_fxk5ta.png',
            email: ASESOR_EMAIL,
            noWa: ASESOR_NOWA,
            role: RoleUser.asesor,
            password: await hashedPassword(ASESOR_PASSWORD),
            keahlian: 'JSA',
        },
        {
            name: 'Direktur',
            image: null,
            email: DIREKTUR_EMAIL,
            noWa: DIREKTUR_NOWA,
            role: RoleUser.direktur,
            password: await hashedPassword(DIREKTUR_PASSWORD),
        },
        {
            name: 'Ahmad Fauzi',
            image: 'https://res.cloudinary.com/dfu2sm1dv/image/upload/v1773504142/engineer_fxk5ta.png',
            email: 'ahmad@peserta.com',
            noWa: '08111111111',
            role: RoleUser.peserta,
            password: await hashedPassword('peserta123'),
        },
        {
            name: 'Dewi Lestari',
            image: 'https://res.cloudinary.com/dfu2sm1dv/image/upload/v1773504142/engineer_fxk5ta.png',
            email: 'dewi@peserta.com',
            noWa: '08111111112',
            role: RoleUser.peserta,
            password: await hashedPassword('peserta123'),
        },
        {
            name: 'Rizki Pratama',
            image: 'https://res.cloudinary.com/dfu2sm1dv/image/upload/v1773504142/engineer_fxk5ta.png',
            email: 'rizki@peserta.com',
            noWa: '08111111113',
            role: RoleUser.peserta,
            password: await hashedPassword('peserta123'),
        },
        {
            name: 'Siti Nurhaliza',
            image: 'https://res.cloudinary.com/dfu2sm1dv/image/upload/v1773504142/engineer_fxk5ta.png',
            email: 'siti@peserta.com',
            noWa: '08111111114',
            role: RoleUser.peserta,
            password: await hashedPassword('peserta123'),
        },
        {
            name: 'Budi Santoso',
            image: 'https://res.cloudinary.com/dfu2sm1dv/image/upload/v1773504142/engineer_fxk5ta.png',
            email: 'budi@peserta.com',
            noWa: '08111111115',
            role: RoleUser.peserta,
            password: await hashedPassword('peserta123'),
        },
        {
            name: 'Anisa Rahmawati',
            image: 'https://res.cloudinary.com/dfu2sm1dv/image/upload/v1773504142/engineer_fxk5ta.png',
            email: 'anisa@peserta.com',
            noWa: '08111111116',
            role: RoleUser.peserta,
            password: await hashedPassword('peserta123'),
        },
        {
            name: 'Hendra Wijaya',
            image: 'https://res.cloudinary.com/dfu2sm1dv/image/upload/v1773504142/engineer_fxk5ta.png',
            email: 'hendra@peserta.com',
            noWa: '08111111117',
            role: RoleUser.peserta,
            password: await hashedPassword('peserta123'),
        },
        {
            name: 'Rina Marlina',
            image: 'https://res.cloudinary.com/dfu2sm1dv/image/upload/v1773504142/engineer_fxk5ta.png',
            email: 'rina@peserta.com',
            noWa: '08111111118',
            role: RoleUser.peserta,
            password: await hashedPassword('peserta123'),
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

async function seedTraining() {
    const trainings = [
        { namaTraining: 'Dasar K3', description: 'Pelatihan dasar keselamatan dan kesehatan kerja' },
        { namaTraining: 'HIRADC', description: 'Hazard Identification Risk Assessment and Decision Control' },
        { namaTraining: 'APD', description: 'Alat Pelindung Diri untuk Keselamatan Kerja' },
        { namaTraining: 'Investigasi Kecelakaan', description: 'Teknik investigasi dan analisis kecelakaan kerja' },
    ];

    for (const training of trainings) {
        await prisma.training.upsert({
            where: { namaTraining: training.namaTraining },
            update: {},
            create: training,
        });
    }

    console.log('✓ Training seeded');
}

async function seedJadwal() {
    const trainingList = await prisma.training.findMany();

    const jadwalData: { trainingId: string; startDate: Date; duration: number; meetingLink: string; batch: string }[] = [];

    for (const training of trainingList) {
        jadwalData.push({
            trainingId: training.id,
            startDate: new Date('2026-01-15'),
            duration: 3,
            meetingLink: 'https://meet.google.com/abc-defg-hij',
            batch: 'Batch-1',
        });
        jadwalData.push({
            trainingId: training.id,
            startDate: new Date('2026-03-10'),
            duration: 3,
            meetingLink: 'https://meet.google.com/xyz-uvwx-rst',
            batch: 'Batch-2',
        });
    }

    for (const jadwal of jadwalData) {
        const existing = await prisma.jadwalTraining.findFirst({
            where: {
                trainingId: jadwal.trainingId,
                batch: jadwal.batch,
            },
        });

        if (!existing) {
            await prisma.jadwalTraining.create({ data: jadwal });
        }
    }

    console.log('✓ Jadwal Training seeded');
}

async function seedDetailJadwal() {
    const jadwalList = await prisma.jadwalTraining.findMany();
    const instruktur = await prisma.user.findUnique({ where: { email: INSTRUKTUR_EMAIL } });
    const asesor = await prisma.user.findUnique({ where: { email: ASESOR_EMAIL } });

    if (!instruktur || !asesor) return;

    for (const jadwal of jadwalList) {
        const existingDetails = await prisma.detailJadwalTraining.count({
            where: { jadwalTrainingId: jadwal.id },
        });

        if (existingDetails > 0) continue;

        const startDate = new Date(jadwal.startDate);

        for (let i = 0; i < jadwal.duration; i++) {
            const hari = new Date(startDate);
            hari.setDate(startDate.getDate() + i);

            await prisma.detailJadwalTraining.create({
                data: {
                    jadwalTrainingId: jadwal.id,
                    hari,
                    hariKe: i + 1,
                    instrukturId: instruktur.id,
                    asesorId: asesor.id,
                },
            });
        }
    }

    console.log('✓ Detail Jadwal seeded');
}

async function seedMateri() {
    const detailList = await prisma.detailJadwalTraining.findMany();
    const instruktur = await prisma.user.findUnique({ where: { email: INSTRUKTUR_EMAIL } });

    if (!instruktur) return;

    const materiPerHari: Record<number, string[]> = {
        1: ['Pengenalan K3', 'Regulasi K3'],
        2: ['Hazard Identification', 'Risk Assessment'],
        3: ['Decision Control', 'Evaluasi Akhir'],
    };

    for (const detail of detailList) {
        const existingMateri = await prisma.materiTraining.count({
            where: { detailJadwalTrainingId: detail.id },
        });

        if (existingMateri > 0) continue;

        const materiList = materiPerHari[detail.hariKe] || ['Materi Umum'];

        for (const judul of materiList) {
            await prisma.materiTraining.create({
                data: {
                    detailJadwalTrainingId: detail.id,
                    judul,
                    fileMateri: null,
                    diuploadOleh: instruktur.id,
                },
            });
        }
    }

    console.log('✓ Materi Training seeded');
}

async function seedPeserta() {
    const pesertaList = await prisma.user.findMany({
        where: { role: RoleUser.peserta },
    });

    const jadwalList = await prisma.jadwalTraining.findMany();

    const pairs: { userId: string; jadwalTrainingId: string }[] = [];

    for (const jadwal of jadwalList) {
        const shuffled = [...pesertaList].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, Math.min(6, shuffled.length));

        for (const peserta of selected) {
            pairs.push({
                userId: peserta.id,
                jadwalTrainingId: jadwal.id,
            });
        }
    }

    for (const pair of pairs) {
        await prisma.pesertaTraining.upsert({
            where: {
                userId_jadwalTrainingId: {
                    userId: pair.userId,
                    jadwalTrainingId: pair.jadwalTrainingId,
                },
            },
            update: {},
            create: pair,
        });
    }

    console.log('✓ Peserta Training seeded');
}

async function seedPenilaian() {
    const pesertaList = await prisma.pesertaTraining.findMany({
        include: { user: true, jadwalTraining: true },
    });

    const catatanKompeten = [
        'Peserta menunjukkan pemahaman yang baik',
        'Hasil ujian memenuhi standar kompetensi',
        'Praktik kerja sesuai prosedur',
        'Peserta mampu menerapkan ilmu dengan benar',
    ];

    const catatanBelumKompeten = [
        'Peserta perlu memperdalam materi hazard identification',
        'Skor ujian tertulis belum mencapai ambang batas',
        'Praktik kerja perlu peningkatan',
    ];

    let idx = 0;

    for (const peserta of pesertaList) {
        const existing = await prisma.penilaian.findUnique({
            where: {
                userId_jadwalTrainingId: {
                    userId: peserta.userId,
                    jadwalTrainingId: peserta.jadwalTrainingId,
                },
            },
        });

        if (existing) continue;

        const isKompeten = idx % 10 !== 0;

        await prisma.penilaian.create({
            data: {
                userId: peserta.userId,
                jadwalTrainingId: peserta.jadwalTrainingId,
                statusKompetensi: isKompeten
                    ? StatusKompetensi.kompeten
                    : StatusKompetensi.belum_kompeten,
                catatan: isKompeten
                    ? catatanKompeten[idx % catatanKompeten.length]
                    : catatanBelumKompeten[idx % catatanBelumKompeten.length],
            },
        });

        idx++;
    }

    console.log('✓ Penilaian seeded');
}

async function seedRevisi() {
    const belumKompeten = await prisma.penilaian.findMany({
        where: { statusKompetensi: StatusKompetensi.belum_kompeten },
    });

    for (const penilaian of belumKompeten) {
        const existing = await prisma.revisiFile.findUnique({
            where: { penilaianId: penilaian.id },
        });

        if (existing) continue;

        await prisma.revisiFile.create({
            data: {
                penilaianId: penilaian.id,
                fileRevisiAdmin: null,
                fileRevisiPeserta: null,
                status: StatusRevisi.pending,
            },
        });
    }

    console.log('✓ Revisi File seeded');
}

async function main(): Promise<void> {
    try {
        await seedUsers();
        await seedTraining();
        await seedJadwal();
        await seedDetailJadwal();
        await seedMateri();
        await seedPeserta();
        await seedPenilaian();
        await seedRevisi();
        console.log('\n🎉 Semua data seeding berhasil!');
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
