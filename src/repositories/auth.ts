import { prisma } from "../utils/client";
import { IUser, IUserWithoutPassword } from "../utils/interfaces";

export const getUserById = async (id: string): Promise<IUserWithoutPassword | null> => {
    return await prisma.user.findUnique({
        where: { id }
    });
}

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
    return await prisma.user.findUnique({
        where: {email}
    });
};

export const getUserByNumberWhatsapp = async (noWa: string): Promise<IUserWithoutPassword | null> => {
    return await prisma.user.findUnique({
        where: {noWa}
    });
};


