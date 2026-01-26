import { prisma } from "../utils/client";
import { ICreateUser, IPagination, IUser } from "../utils/interfaces";

export const createInstrukturOrAsesor = async (payload: ICreateUser): Promise<IUser> => {
    return await prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            noWa: payload.noWa,
            role: payload.role ?? "peserta", // set default role to "user" if not provided
            password: payload.password,
            keahlian: payload.keahlian,
        },
    });
}

export const getInstrukturOrAsesorById = async (id: string): Promise<IUser | null> => {
    return await prisma.user.findUnique({
        where: { id },
    });
}

export const updateInstrukturOrAsesor = async (id: string, payload: Partial<IUser>): Promise<IUser> => { // Partial<IUser> means that all properties in IUser are optional
    return await prisma.user.update({
        where: { id},
        data: { ...payload }
    });
}

export const deleteInstrukturOrAsesor = async (id: string): Promise<IUser> => {
    return await prisma.user.delete({
        where: { id }
    });
};

export const getAllInstrukturOrAsesor = async (payload: IPagination): Promise<IUser[]> => {
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