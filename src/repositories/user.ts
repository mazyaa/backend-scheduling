import { prisma } from "../utils/client";
import { IUser } from "../utils/interfaces";

export const getUserById = async (id: string): Promise<IUser | null> => {
    return await prisma.user.findUnique({
        where: {
            id
        }
    });
}

export const updatePasswordUser = async (id: string, password: string): Promise<IUser> => {
    return await prisma.user.update({
        where: {
            id
        },
        data: {
            password
        }
    });
}