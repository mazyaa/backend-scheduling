import { prisma } from "../utils/client";
import { ICredential, ICredentialPayload } from "../utils/interfaces";

export const createToken = async (payload: ICredentialPayload): Promise<ICredential> => {
    return await prisma.passwordReset.create({
        data: {
            token: payload.token,
            userId: payload.userId,
            expiredAt: payload.expiredAt,
            isUsed: payload.isUsed,
        },
    });
};

export const findTokenHashed = async (tokenHash: string): Promise<Pick<ICredential, 'token'> | null> => {
    return await prisma.passwordReset.findUnique({
        where: {
            token: tokenHash
        }
    });
};

export const markAsUsedToken = async (id: string): Promise<ICredential> => {
    return await prisma.passwordReset.update({
        where: {
            id
        },
        data: {
            isUsed: true
        }
    });
};