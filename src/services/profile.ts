import bcrypt from 'bcrypt';
import { HttpError } from '../utils/error';
import * as profileRepository from '../repositories/profile';

export const getProfile = async (userId: string) => {
    const user = await profileRepository.getUserWithProfile(userId);

    if (!user) {
        throw new HttpError('User tidak ditemukan.', 404);
    }

    return {
        name: user.name,
        email: user.email,
        noWa: user.noWa,
        instansi: user.profilPeserta?.instansi ?? null,
    };
};

export const updateProfile = async (
    userId: string,
    payload: { name?: string; noWa?: string; instansi?: string },
) => {
    const { name, noWa, instansi } = payload;

    if (name || noWa) {
        await profileRepository.updateUserProfile(userId, { name, noWa });
    }

    if (instansi !== undefined) {
        await profileRepository.updateProfilPeserta(userId, instansi);
    }

    return await getProfile(userId);
};

export const changePassword = async (
    userId: string,
    payload: { oldPassword: string; newPassword: string; confirmPassword: string },
) => {
    const { oldPassword, newPassword, confirmPassword } = payload;

    if (newPassword !== confirmPassword) {
        throw new HttpError('Password baru dan konfirmasi password tidak cocok.', 400);
    }

    if (newPassword.length < 6) {
        throw new HttpError('Password baru minimal 6 karakter.', 400);
    }

    const user = await profileRepository.getUserPassword(userId);

    if (!user || !user.password) {
        throw new HttpError('User tidak ditemukan.', 404);
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
        throw new HttpError('Password lama salah.', 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await profileRepository.updatePassword(userId, hashedPassword);

    return { message: 'Password berhasil diubah.' };
};
