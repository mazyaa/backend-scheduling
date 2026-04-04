import { NextFunction, Request, Response } from "express";
import Joi, { ValidationError } from "joi";
import { generateJoiErrorMessage } from "../../utils/helper";

const setPasswordSchema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(8).required(),
});

export const setPasswordValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await setPasswordSchema.validateAsync(req.body, { abortEarly: false });

        next();
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);

        res.status(400).json({ message: errorMessage });
    }
}