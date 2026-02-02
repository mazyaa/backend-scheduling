import Joi, { ValidationError } from "joi";
import { generateJoiErrorMessage } from "../../utils/helper";
import { Request, Response, NextFunction } from "express";

const createDetailScheduleSchema = Joi.object({
    aktivitas: Joi.string().required(),
    instrukturId: Joi.string().uuid().allow(null).allow(''),
    asesorId: Joi.string().uuid().allow(null).allow(''),
});

const updateDetailScheduleSchema = Joi.object({
    aktivitas: Joi.string().optional(),
    instrukturId: Joi.string().uuid().allow(null).allow('').optional(),
    asesorId: Joi.string().uuid().allow(null).allow('').optional(),
});

export const createDetailScheduleValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await createDetailScheduleSchema.validateAsync(req.body, { abortEarly: false });

        next();
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
}

export const updateDetailScheduleValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await updateDetailScheduleSchema.validateAsync(req.body, { abortEarly: false });    

        next();
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
}