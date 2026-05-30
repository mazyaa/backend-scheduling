import Joi, { ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { generateJoiErrorMessage } from '../../utils/helper';

const penilaianIdParamsSchema = Joi.object({
    penilaianId: Joi.string().uuid().required(),
});

export const validatePenilaianIdParams = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await penilaianIdParamsSchema.validateAsync(req.params, { abortEarly: false });
        next();
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
};
