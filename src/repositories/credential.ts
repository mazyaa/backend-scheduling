import { prisma } from "../utils/client";
import { ISetPassword, ISetPasswordPayload } from "../utils/interfaces";

export const createToken = async (payload: ISetPasswordPayload): Promise<ISetPassword> => {
    return await prisma.passwordReset.create({
        data: {
            token: payload.token,
            userId: payload.userId,
            expiredAt: payload.expiredAt,
            isUsed: payload.isUsed,
        },
    });
};

export const findTokenHashed = async (tokenHash: string): Promise<Pick<ISetPassword, 'token'> | null> => {
    return await prisma.passwordReset.findUnique({
        where: {
            token: tokenHash
        }
    });
};

export const markAsUsedToken = async (id: string): Promise<Pick<ISetPassword, 'isUsed'>> => {
    return await prisma.passwordReset.update({
        where: {
            id
        },
        data: {
            isUsed: true
        }
    });
};