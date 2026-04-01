import { prisma } from "../utils/client";
import { ICreateUser, IPagination, IUser, IUserWithoutPassword } from "../utils/interfaces";

export const createInstrukturOrAsesor = async (payload: Omit<ICreateUser, 'password'>): Promise<IUser> => {
    return await prisma.user.create({
        data: {
            name: payload.name,
            image: payload.image,
            email: payload.email,
            noWa: payload.noWa,
            role: payload.role ?? "peserta", // set default role to "user" if not provided
            keahlian: payload.keahlian,
        },
    });
}

export const getInstrukturOrAsesorById = async (id: string): Promise<IUser | null> => {
    return await prisma.user.findUnique({
        where: { id },
    });
}

export const updateInstrukturOrAsesor = async (id: string, payload: Omit<ICreateUser, 'password'>): Promise<IUser> => { 
    return await prisma.user.update({
        where: { id },
        data: { 
            // use spread operator to conditionally update fields only if they are provided in the payload
            ...(payload.name && { name: payload.name }), // if payload.name exists, update name
            ...(payload.image && { image: payload.image }),
            ...(payload.email && { email: payload.email }),
            ...(payload.noWa && { noWa: payload.noWa }),
            ...(payload.role && { role: payload.role }),
            ...(payload.keahlian && { keahlian: payload.keahlian }),
         }
    });
}

export const updatePasswordInstrukturOrAsesor = async (id: string, password: string): Promise<IUserWithoutPassword> => {
    return await prisma.user.update({
        where: { id },
        data: { password }
    });
}

export const deleteInstrukturOrAsesor = async (id: string): Promise<IUser> => {
    return await prisma.user.delete({
        where: { id }
    });
};

export const getAllInstrukturOrAsesor = async (payload: IPagination): Promise<IUserWithoutPassword[]> => {
    const { skip, take, where = {}, orderBy } = payload;

    return await prisma.user.findMany({
        skip,
        take,
        where: {
            ...where,
            OR: [ // filter only role instruktur and asesor
                { role: "instruktur" },
                { role: "asesor" }
            ]
        },
        orderBy,
    });
}

export const countInstrukturOrAsesor = async (where?: object): Promise<number> => {
    return await prisma.user.count({
        where,
    });
}