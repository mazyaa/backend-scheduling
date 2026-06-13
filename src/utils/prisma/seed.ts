import 'dotenv/config';
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
  SEED_DOMAIN,
  SEED_PASSWORD,
} from '../env';

const hashPassword = async (pw: string) => await bcrypt.hash(pw, 10);
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
      image:
        'https://res.cloudinary.com/dfu2sm1dv/image/upload/v1773504142/engineer_fxk5ta.png',
      email: PESERTA_EMAIL,
      noWa: PESERTA_NOWA,
      role: RoleUser.peserta,
      password: await hashPassword(PESERTA_PASSWORD),
    },
    {
      name: 'Instruktur',
      image:
        'https://res.cloudinary.com/dfu2sm1dv/image/upload/v1773504142/engineer_fxk5ta.png',
      email: INSTRUKTUR_EMAIL,
      noWa: INSTRUKTUR_NOWA,
      role: RoleUser.instruktur,
      password: await hashPassword(INSTRUKTUR_PASSWORD),
      keahlian: 'HSE DEVELOPMENT',
    },
    {
      name: 'Asesor',
      image:
        'https://res.cloudinary.com/dfu2sm1dv/image/upload/v1773504142/engineer_fxk5ta.png',
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

  // Cleanup before seeding
  const trainingNames = ['AK3U BNSP', 'POPAL BNSP', 'POP PERTAMBANGAN BNSP'];
  await prisma.training.deleteMany({
    where: { namaTraining: { in: trainingNames } },
  });
  await prisma.user.deleteMany({ where: { email: { endsWith: SEED_DOMAIN } } });
  console.log('✓ Cleanup done');

  // --- Training ---
  const trainingData = [
    {
      namaTraining: 'AK3U BNSP',
      image:
        'https://res.cloudinary.com/dqlwezl93/image/upload/v1781358557/AK3U-BNSP_dq49wf.webp',
      description:
        'Ahli K3 Umum BNSP - Pelatihan dan Sertifikasi Ahli Keselamatan dan Kesehatan Kerja Umum yang diakui oleh BNSP',
    },
    {
      namaTraining: 'POPAL BNSP',
      image:
        'https://res.cloudinary.com/dqlwezl93/image/upload/v1781358559/POPPAL_BNSP_xlcvgz.webp',
      description:
        'Pengawas Operasional Ahli Lingkungan BNSP - Pelatihan dan Sertifikasi Pengawas Operasional di bidang Lingkungan',
    },
    {
      namaTraining: 'PPPA BNSP',
      image:
        'https://res.cloudinary.com/dqlwezl93/image/upload/v1781358558/PPPA_BNSP_umf0re.webp',
      description:
        'Penanggung Jawab Pengendalian Pencemaran Air BNSP - Pelatihan dan Sertifikasi Penanggung Jawab Pengendalian Pencemaran Air',
    },
    {
      namaTraining: 'POP PERTAMBANGAN BNSP',
      image:
        'https://res.cloudinary.com/dqlwezl93/image/upload/v1781358558/POP-PERTAMBANGAN_pvmzge.webp',
      description:
        'Pengawas Operasional Pertambangan BNSP - Pelatihan dan Sertifikasi Pengawas Operasional di bidang Pertambangan',
    },
    {
      namaTraining: 'POIPPU BNSP',
      image:
        'https://res.cloudinary.com/dqlwezl93/image/upload/v1781358558/POP-PERTAMBANGAN_pvmzge.webp',
      description:
        'Penanggung Jawab Operasional Instalasi Pengendalian Pencemaran Udara BNSP - Pelatihan dan Sertifikasi Penanggung Jawab Operasional Instalasi Pengendalian Pencemaran Udara',
    },
    {
      namaTraining: 'PENGAWAS K3 MIGAS BNSP',
      image:
        'https://res.cloudinary.com/dqlwezl93/image/upload/v1781358558/PENGAWAS_K3_MIGAS_wrz7sw.webp',
      description:
        'Pengawas K3 Migas BNSP - Pelatihan dan Sertifikasi Pengawas Keselamatan dan Kesehatan Kerja di Industri Migas',
    },
    {
      namaTraining: 'PLB3 BNSP',
      image:
        'https://res.cloudinary.com/dqlwezl93/image/upload/v1781358558/PLB3_BNSP_kixfln.webp',
      description:
        'Penanggung Jawab Pengelolaan Limbah Bahan Berbahaya dan Beracun BNSP - Pelatihan dan Sertifikasi Penanggung Jawab Pengelolaan Limbah B3',
    },
    {
      namaTraining: 'OPLB3 BNSP',
      image:
        'https://res.cloudinary.com/dqlwezl93/image/upload/v1781358558/OPLB3_BNSP_ebidem.webp',
      description:
        'Operator Pengelolaan Limbah Bahan Berbahaya dan Beracun BNSP - Pelatihan dan Sertifikasi Operator Pengelolaan Limbah B3',
    },
    {
      namaTraining: 'HIMU BNSP',
      image:
        'https://res.cloudinary.com/dqlwezl93/image/upload/v1781358557/HIMUBNSP_houj9t.webp',
      description:
        'Higiene Industri Muda BNSP - Pelatihan dan Sertifikasi Higiene Industri Muda yang diakui oleh BNSP',
    },
  ];

  const createdTrainings: any[] = [];
  for (const t of trainingData) {
    const created = await prisma.training.create({ data: t });
    createdTrainings.push(created);
  }
  console.log('✓ Training created');

  const instruktur1 = await prisma.user.create({
    data: {
      name: 'Yakin Ermanto, S.T., M.B',
      image: 'https://res.cloudinary.com/dqlwezl93/image/upload/v1781359781/i1_lwbsw4.jpg',
      email: `instruktur1${SEED_DOMAIN}`,
      noWa: '62811100001',
      role: RoleUser.instruktur,
      password: pw,
      keahlian: 'K3 Umum & HSE',
    },
  });

  const instruktur2 = await prisma.user.create({
    data: {
      name: 'Erian Sutantio, S.T., M.K.K.K',
      image: 'https://res.cloudinary.com/dqlwezl93/image/upload/v1781359781/i2_suewwm.jpg',
      email: `instruktur2${SEED_DOMAIN}`,
      noWa: '62811100002',
      role: RoleUser.instruktur,
      password: pw,
      keahlian: 'Keselamatan Kerja',
    },
  });

  const instruktur3 = await prisma.user.create({
    data: {
      name: 'Ruri Anggara Akhirullah, S.T., M.Ling.',
      image: 'https://res.cloudinary.com/dqlwezl93/image/upload/v1781359781/i3_us9rk9.jpg',
      email: `instruktur3${SEED_DOMAIN}`,
      noWa: '62811100003',
      role: RoleUser.instruktur,
      password: pw,
      keahlian: 'AHLI LINGKUNGAN',
    },
  });

  console.log('✓ 3 Instruktur created');

  // --- 3 Asesor ---
  const asesor1 = await prisma.user.create({
    data: {
      name: 'Hendra Kusuma Saputra, S.T., M.K.K.K',
      image: 'https://res.cloudinary.com/dqlwezl93/image/upload/v1781359876/a3_wbzkuu.jpg',
      email: `asesor1${SEED_DOMAIN}`,
      noWa: '6282220001',
      role: RoleUser.asesor,
      password: pw,
      keahlian: 'Kompetensi AK3U',
    },
  });

  const asesor2 = await prisma.user.create({
    data: {
      name: 'Indah Permata Sari S.T., M.Ling.',
      image: 'https://res.cloudinary.com/dqlwezl93/image/upload/v1781360042/a22_kvqfk3.jpg',
      email: `asesor2${SEED_DOMAIN}`,
      noWa: '6282220002',
      role: RoleUser.asesor,
      password: pw,
      keahlian: 'Kompetensi LINGKUNGAN',
    },
  });

  const asesor3 = await prisma.user.create({
    data: {
      name: 'Joko Susilo Saputra S.T., M.K.K.K',
      image: 'https://res.cloudinary.com/dqlwezl93/image/upload/v1781359876/a1_ykfqhq.jpg',
      email: `asesor3${SEED_DOMAIN}`,
      noWa: '6282220003',
      role: RoleUser.asesor,
      password: pw,
      keahlian: 'Kompetensi K3 dan LINGKUNGAN',
    },
  });

  console.log('✓ 3 Asesor created');
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
