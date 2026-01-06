import { prisma } from '../client';
import bcrypt from 'bcrypt';
import { RoleUser } from '@prisma/client';
import { IUser } from '../interfaces';
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

async function seedUsers() {
    const users: IUser[] = [
        {
            name: 'Admin',
            email: ADMIN_EMAIL,
            noWa: ADMIN_NOWA,
            role: RoleUser.admin,
            password: await bcrypt.hash(ADMIN_PASSWORD, 10),
        },
        {
            name: 'Peserta',
            email: PESERTA_EMAIL,
            noWa: PESERTA_NOWA,
            role: RoleUser.peserta,
            password: await bcrypt.hash(PESERTA_PASSWORD, 10),
        },
        {
            name: 'Instruktur',
            email: INSTRUKTUR_EMAIL,
            noWa: INSTRUKTUR_NOWA,
            role: RoleUser.instruktur,
            password: await bcrypt.hash(INSTRUKTUR_PASSWORD, 10),
            keahlian: 'HSE DEVELOPMENT',
        },
        {
            name: 'Asesor',
            email: ASESOR_EMAIL,
            noWa: ASESOR_NOWA,
            role: RoleUser.asesor,
            password: await bcrypt.hash(ASESOR_PASSWORD, 10),
            keahlian: 'JSA',
        },
        {
            name: 'Direktur',
            email: DIREKTUR_EMAIL,
            noWa: DIREKTUR_NOWA,
            role: RoleUser.direktur,
            password: await bcrypt.hash(DIREKTUR_PASSWORD, 10),
        },
    ];

    for (const user of users) { // loop users array using for...of
        await prisma.user.upsert({ // use upsert to avoid duplicate entries (update if exists, insert if not exists)
            where: { id: user.email }, // use email as unique identifier
            update: {}, // if user exists, do nothing (empty update) because we don't want to change existing data
            create: user, // create new user
        });
    };
}

async function main(): Promise<void> {
    try {
        await seedUsers();
        console.log('Data seeding generated successfully!');
    } catch (error) {
        console.error('Error during seeding:', error); 
    } finally {
        await prisma.$disconnect(); // disconnect prisma client if any error occurs or seeding is done
    }
}

main();

