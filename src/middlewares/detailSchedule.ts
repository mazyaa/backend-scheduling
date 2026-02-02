import * as detailScheduleServices from "../services/detailSchedule";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/error";

export const checkDeatailScheduleIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const detailSchedule = await detailScheduleServices.getDetailScheduleById(id);

    if (!detailSchedule) {
        throw new HttpError("Detail Schedule not found", 404);
    }

    res.locals.detailSchedule = detailSchedule;  

    next();
}