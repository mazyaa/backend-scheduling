import Joi, { ValidationError } from "joi";
import { generateJoiErrorMessage } from "../../utils/helper";
import { Request, Response, NextFunction } from "express";

const createOrUpdateInstrukturAndAsesorSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    noWa: Joi.string()
        .pattern(/^(\+[1-9][0-9]*|0[1-9][0-9]*)$/)
        .required(),
    role: Joi.string().valid('instruktur', 'asesor').required(),
    keahlian: Joi.string().required(),
});

export const createOrUpdateInstrukturAndAsesorValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // validate from req.body against createOrUpdateInstrukturAndAsesorSchema
        await createOrUpdateInstrukturAndAsesorSchema.validateAsync(req.body, { abortEarly: false });

        next(); // if no error, pass control to next middleware or controller
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
}