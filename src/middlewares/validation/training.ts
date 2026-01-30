import Joi, { ValidationError } from "joi";
import { generateJoiErrorMessage } from "../../utils/helper";
import { Request, Response, NextFunction } from "express";

const createTrainingSchema = Joi.object({
    namaTraining: Joi.string().required(),
    description: Joi.string().required(),
});

const updateTrainingSchema = Joi.object({
    namaTraining: Joi.string().optional(),
    description: Joi.string().optional(),
});

export const createTrainingValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // validate from req.body against createOrUpdateTrainingSchema
        await createTrainingSchema.validateAsync(req.body, { abortEarly: false });
        
        next(); // if no error, pass control to next middleware or controller
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
}

export const updateTrainingValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await updateTrainingSchema.validateAsync(req.body, { abortEarly: false });

        next();
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
}