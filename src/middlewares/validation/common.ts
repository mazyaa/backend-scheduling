import Joi, { ValidationError } from "joi";
import { generateJoiErrorMessage } from "../../utils/helper";
import { Request, Response, NextFunction } from "express";

const idParamsSchema = Joi.object({
    id: Joi.string().uuid().required(),
});

export const validateIdParams = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // validate req.params against idParamsSchema
        await idParamsSchema.validateAsync(req.params, { abortEarly: false });

        next(); // if no error, pass control to next middleware or controller
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
}