import { Request, Response } from 'express';
import { IUserWithoutPassword } from '../utils/interfaces';
import * as profileService from '../services/profile';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
    const currentUser = res.locals.currentUserLogin as IUserWithoutPassword;

    const result = await profileService.getProfile(currentUser.id);

    res.status(200).json({
        message: 'Profile retrieved successfully!',
        data: result,
    });
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    const currentUser = res.locals.currentUserLogin as IUserWithoutPassword;
    const payload = req.body;

    const result = await profileService.updateProfile(currentUser.id, payload);

    res.status(200).json({
        message: 'Profile updated successfully!',
        data: result,
    });
};

export const changePassword = async (req: Request, res: Response): Promise<void> => {
    const currentUser = res.locals.currentUserLogin as IUserWithoutPassword;
    const payload = req.body;

    const result = await profileService.changePassword(currentUser.id, payload);

    res.status(200).json(result);
};
