import { prisma } from "../utils/client";
import { ICredentialPayload } from "../utils/interfaces";

export const createToken = async (payload: ICredentialPayload) => {
    return await prisma.passwordReset.create({
        data: {
            token: payload.token,
            userId: payload.userId,
            expiredAt: payload.expiredAt,
            isUsed: payload.used,
        },
    });
};