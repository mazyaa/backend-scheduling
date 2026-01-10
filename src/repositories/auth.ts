import { prisma } from "../utils/client";
import { ICreateUser } from "../utils/interfaces";

export const getUserById = async (id: string): Promise<ICreateUser | null> => {
    return await prisma.user.findUnique({
        where: { id }
    });
}

export const getUserByEmail = async (email: string): Promise<ICreateUser | null> => {
    return await prisma.user.findUnique({
        where: {email}
    });
};

export const getUserByNumberWhatsapp = async (noWa: string): Promise<ICreateUser | null> => {
    return await prisma.user.findUnique({
        where: {noWa}
    });
};


