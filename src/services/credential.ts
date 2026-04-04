import * as userRepository from "../repositories/user";
import * as credentialRepository from "../repositories/credential";
import { HttpError } from "../utils/error";
import { generateExpiry, generateToken, hashToken, TOKEN_EXPIRATION_TIME } from "../utils/jwt";
import { ICredentialPayload } from "../utils/interfaces";
export const sendSetPasswordLink = async (id: string) => {
    const getUser = await userRepository.getUserById(id);

    if (!getUser) {
        throw new HttpError("User not found!", 404);
    }

    const token = generateToken({
        userId: getUser.id,
        role: getUser.role
    }, TOKEN_EXPIRATION_TIME.SET_PASSWORD);

    const tokenHash = hashToken(token);

    await credentialRepository.createToken({
        token: tokenHash,
        userId: getUser.id,
        expiredAt: generateExpiry(60),
        isUsed: false
    }) as ICredentialPayload;

    const generateLink = `${process.env.FRONTEND_URL}/set-password?token=${token}`;

    const message =
    `Yth. Bapak/Ibu ${getUser.name},\n\n` +
    `Akun Anda telah berhasil dibuat pada sistem kami, berikut akun yang digunakan untuk login.\n\n` +
    `Email : ${getUser.email}\n\n` +
    `Demi menjaga keamanan dan privasi akun, kami tidak mengirimkan kata sandi secara langsung.\n` +
    `Silakan melakukan pengaturan kata sandi secara mandiri melalui tautan berikut:\n\n` +
    `${generateLink}\n\n` +
    `Tautan ini bersifat rahasia dan memiliki batas waktu penggunaan hingga 1 JAM!.\n` +
    `Mohon untuk tidak membagikan tautan ini kepada pihak lain dan segera melakukan pengaturan kata sandi anda.\n\n` +
    `Salam,\nAdmin PT. Veritrust Global Solusindo`;

    const generatedMessage = `https://wa.me/${getUser.noWa}?text=${encodeURIComponent(message)}`;                           

    return {
        link: generateLink,
        message: generatedMessage
    }
};
