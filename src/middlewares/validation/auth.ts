import Joi, { ValidationError } from "joi";
import { generateJoiErrorMessage } from "../../utils/helper";
import { Request, Response, NextFunction } from "express";

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const loginValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        //use validateAsync to validate req.body against loginSchema
        await loginSchema.validateAsync(req.body, { abortEarly: false }); // use abortEarly: false to collect or gather all errors

        next(); // call next to pass control to the next middleware or next to controller
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage }); // send JSON response with status code 400 and error message
    }
}