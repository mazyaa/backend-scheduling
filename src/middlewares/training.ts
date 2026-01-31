import { NextFunction, Request, Response } from "express";
import * as trainingServices from "../services/training";
import { HttpError } from "../utils/error";

export const checkTrainingIdExist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const training = await trainingServices.getTrainingById(id);

    if (!training) {
        throw new HttpError("Training not found!", 404);
    }

    res.locals.training = training; 

    next(); // if training exists, proceed to the next middleware or route handler
}

export const checkTrainingNameDuplicate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { namaTraining } = req.body;

    const existingTraining = res.locals.training;
    const skipUniqueCheck: boolean = existingTraining?.namaTraining === namaTraining; // if true, skip name uniqueness check

    if (namaTraining && !skipUniqueCheck) {
        const trainingWithSameName = await trainingServices.getTrainingByName(namaTraining);

        if (trainingWithSameName) {
            throw new HttpError("Training name already in use", 409);
        }
    }
    
    next();
}