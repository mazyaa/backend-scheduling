import Joi, { ValidationError } from "joi";
import { generateJoiErrorMessage } from "../../utils/helper";
import { Request, Response, NextFunction } from "express";


const createScheduleSchema = Joi.object({
    trainingId: Joi.string().uuid().required(),
    startDate: Joi.date().required(),
    duration: Joi.number().integer().min(1).required(),
    meetingLink: Joi.string().uri().required(),
    batch: Joi.string().required(),
    detailJadwal: Joi.array().items(
        Joi.object({
            hari: Joi.date(),
            hariKe: Joi.number().integer().min(1),
        })
    )
});

const updateScheduleSchema = Joi.object({
    trainingId: Joi.string().uuid().optional(),
    startDate: Joi.date().optional(),
    duration: Joi.number().integer().min(1).optional(),
    meetingLink: Joi.string().uri().optional(),
    batch: Joi.string().optional(),
    detailJadwal: Joi.array().items(
        Joi.object({
            hari: Joi.date(),
            hariKe: Joi.number().integer().min(1),
        })
    ).optional()
});

export const createScheduleValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // validate from req.body against createScheduleSchema
        await createScheduleSchema.validateAsync(req.body, { abortEarly: false });

        next(); // if no error, pass control to next middleware or controller
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
}

export const updateScheduleValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // validate from req.body against updateScheduleSchema
        await updateScheduleSchema.validateAsync(req.body, { abortEarly: false }); 

        next(); // if no error, pass control to next middleware or controller
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
}