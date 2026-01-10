import { prisma } from "../utils/client";
import { ICreateUser, IUser } from "../utils/interfaces";

export const createPeserta = async (payload: IUser): Promise<ICreateUser> => {
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

export const getPesertaById = async (id: string): Promise<ICreateUser | null> => {
    return await prisma.user.findUnique({ // if using findUnique attribute must be unique (id is unique)
        where: { id },
    })
}