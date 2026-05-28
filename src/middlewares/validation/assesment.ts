import Joi, { ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { generateJoiErrorMessage } from '../../utils/helper';

const createAssesmentSchema = Joi.object({
    userId: Joi.string().uuid().required(),
    jadwalTrainingId: Joi.string().uuid().required(),
    statusKompetensi: Joi.string().valid('kompeten', 'belum_kompeten').required(),
    catatan: Joi.string().required(),
});

const updateAssesmentSchema = Joi.object({
    userId: Joi.string().uuid().optional(),
    jadwalTrainingId: Joi.string().uuid().optional(),
    statusKompetensi: Joi.string().valid('kompeten', 'belum_kompeten').optional(),
    catatan: Joi.string().optional(),
});

export const createAssesmentValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await createAssesmentSchema.validateAsync(req.body, { abortEarly: false });

        next();
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
}

export const updateAssesmentValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await updateAssesmentSchema.validateAsync(req.body, { abortEarly: false });

        next();
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
}
