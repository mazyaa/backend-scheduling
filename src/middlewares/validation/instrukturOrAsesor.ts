import Joi, { ValidationError } from "joi";
import { generateJoiErrorMessage } from "../../utils/helper";
import { Request, Response, NextFunction } from "express";

const createInstrukturAndAsesorSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    noWa: Joi.string()
        .pattern(/^(?:\+62|62|0)8[1-9][0-9]{6,}$/)
        .required(),
    role: Joi.string().valid('instruktur', 'asesor').required(),
    keahlian: Joi.string().required(),
});

const updateInstrukturAndAsesorSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    noWa: Joi.string()
        .pattern(/^(?:\+62|62|0)8[1-9][0-9]{6,}$/)
        .optional(),
    role: Joi.string().valid('instruktur', 'asesor').optional(),
    keahlian: Joi.string().optional(),
});

export const createInstrukturAndAsesorValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // validate from req.body against createOrUpdateInstrukturAndAsesorSchema
        await createInstrukturAndAsesorSchema.validateAsync(req.body, { abortEarly: false });

        next(); // if no error, pass control to next middleware or controller
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
}

export const updateInstrukturAndAsesorValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await updateInstrukturAndAsesorSchema.validateAsync(req.body, { abortEarly: false });

        next();
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
}