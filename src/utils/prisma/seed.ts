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

async function main(): Promise<void> {
    try {
        await seedUsers();
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
