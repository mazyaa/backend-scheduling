import { hashToken, verifyToken } from "../utils/jwt";
import * as credentialRepository from "../repositories/credential";
import * as userRepository from "../repositories/user";
import bcrypt from "bcrypt";
import { HttpError } from "../utils/error";
import { ICredential, ICredentialPayload } from "../utils/interfaces";

export const setPassword = async (token: string, password: string) => {
    if (!token ) {
        throw new HttpError("Token not found!", 404);
    }

    const payload = verifyToken(token);

    const tokenHash = hashToken(token);

    const tokenData = await credentialRepository.findTokenHashed(tokenHash) as ICredential;

    if (!tokenData) {
        throw new HttpError("Token not found!", 404);
    }

    if (tokenData.isUsed) {
        throw new HttpError("Token already used!", 400);
    }

    if (tokenData.expiredAt < new Date()) {
        throw new HttpError("Token expired!", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10,);

    await userRepository.updatePasswordUser(tokenData.userId, hashedPassword);

    await credentialRepository.markAsUsedToken(tokenData.id);

    return true;
}