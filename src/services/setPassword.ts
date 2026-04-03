import { hashToken, verifyToken } from "../utils/jwt";
import * as credentialRepository from "../repositories/credential";
import * as userRepository from "../repositories/user";
import bcrypt from "bcrypt";
import { HttpError } from "../utils/error";
import { ISetPasswordPayload } from "../utils/interfaces";

export const setPassword = async (token: string, newPassword: string) => {
    const payload = verifyToken(token);

    const tokenHash = hashToken(token);

    const tokenData = await credentialRepository.findTokenHashed(tokenHash) as ISetPasswordPayload;

    if (!tokenData) {
        throw new HttpError("Token not found!", 404);
    }

    if (tokenData.isUsed) {
        throw new HttpError("Token already used!", 400);
    }

    if (tokenData.expiredAt < new Date()) {
        throw new HttpError("Token expired!", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userRepository.updatePasswordUser(tokenData.userId, hashedPassword);

    await credentialRepository.markAsUsedToken(tokenData.userId);

    return true;
}