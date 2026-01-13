import { NextFunction, Request, Response } from "express";
import * as trainingServices from "../services/training";
import { HttpError } from "../utils/error";

export const checkTrainingIdExist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const training = await trainingServices.getTrainingById(id);

    if (!training) {
        throw new HttpError("Training not found", 404);
    }

    next(); // if training exists, proceed to the next middleware or route handler
}