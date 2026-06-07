import Joi, { ValidationError } from 'joi';
import { generateJoiErrorMessage } from '../../utils/helper';
import { Request, Response, NextFunction } from 'express';

const updateProfileSchema = Joi.object({
    name: Joi.string().max(150).optional(),
    email: Joi.string().email().max(150).optional(),
    noWa: Joi.string()
        .pattern(/^(?:\+62|62|0)[1-9][0-9]{6,}$/)
        .max(20)
        .optional(),
});

const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required(),
});

export const updateProfileValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await updateProfileSchema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
};

export const changePasswordValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await changePasswordSchema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
};
