import Joi, { ValidationError } from "joi";
import { generateJoiErrorMessage } from "../../utils/helper";
import { Request, Response, NextFunction } from "express";

const createOrUpdateTrainingSchema = Joi.object({
    namaTraining: Joi.string().required(),
    description: Joi.string().required(),
});

export const createOrUpdateTrainingValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // validate from req.body against createOrUpdateTrainingSchema
        await createOrUpdateTrainingSchema.validateAsync(req.body, { abortEarly: false });
        
        next(); // if no error, pass control to next middleware or controller
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
}