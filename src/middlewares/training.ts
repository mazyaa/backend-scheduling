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

    const existingTraining = await trainingServices.getTrainingByName(namaTraining);

    if (existingTraining) {
        throw new HttpError("Training with the same name already exists!", 409);
    }

    next();
}