import { prisma } from "../utils/client";
import { ICreateUser, IUser } from "../utils/interfaces";

export const createInstrukturOrAsesor = async (payload: IUser): Promise<ICreateUser> => {
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


export const updateInstrukturOrAsesor = async (id: string, payload: Partial<IUser>): Promise<ICreateUser> => { // Partial<IUser> means that all properties in IUser are optional
    return await prisma.user.update({
        where: { id},
        data: { ...payload }
    });
}

export const deleteInstrukturOrAsesor = async (id: string): Promise<ICreateUser> => {
    return await prisma.user.delete({
        where: { id }
    });
};

export const getAllInstrukturOrAsesor = async (): Promise<ICreateUser[]> => {
    return await prisma.user.findMany();
};