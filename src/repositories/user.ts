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

export const getUserIfExistsInSchedule = async (userId: string, jadwalTrainingId: string): Promise<IUser | null> => {
    return await prisma.user.findFirst({
        where: {
            id: userId,
            pesertaTraining: {
                some: { // Ensure the user is linked to the specified training schedule
                    jadwalTrainingId
                }
            }
        }
    });
}