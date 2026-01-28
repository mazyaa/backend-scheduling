import * as scheduleServices from "../services/schedule";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/error";

export const checkScheduleIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const schedule = await scheduleServices.getScheduleById(id);

    if (!schedule) {
        throw new HttpError("Schedule not found", 404);
    }

    res.locals.schedule = schedule; // store schedule data in res.locals for access in next middleware or controller 

    next();
}