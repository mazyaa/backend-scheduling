import { NextFunction, Request, Response } from "express";
import * as sessionDetailScheduleServices from "../services/sessionDetailSchedule";

export const checkSessionDetailScheduleIdExists = async (req: Request, res: Response, next: NextFunction ) => {
    const { id } = req.params;
    const sessionDetailSchedule = await sessionDetailScheduleServices.getSessionDetailScheduleById(id);

    if (!sessionDetailSchedule) {
        throw new Error("Session detail schedule not found");
    }

    res.locals.sessionDetailSchedule = sessionDetailSchedule;

    next();
}