import Joi, { ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { generateJoiErrorMessage } from '../../utils/helper';

const createMateriSchema = Joi.object({
    detailJadwalTrainingId: Joi.string().uuid().required(),
    judul: Joi.string().max(200).required(),
    fileMateri: Joi.string().optional().allow(null, ''),
});

const updateMateriSchema = Joi.object({
    detailJadwalTrainingId: Joi.string().uuid().optional(),
    judul: Joi.string().max(200).optional(),
    fileMateri: Joi.string().optional().allow(null, ''),
});

export const createMateriValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await createMateriSchema.validateAsync(req.body, { abortEarly: false });

        next();
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
}

export const updateMateriValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await updateMateriSchema.validateAsync(req.body, { abortEarly: false });

        next();
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
}
