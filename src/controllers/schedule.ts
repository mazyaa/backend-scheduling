import { Request, Response } from "express";
import { ICreateSchedule } from "../utils/interfaces";
import * as scheduleServices from "../services/schedule";

export const createSchedle = async (req: Request, res: Response): Promise<void> => {
    const payload = req.body as ICreateSchedule;

    const result = await scheduleServices.createSchedule(payload);

    res.status(201).json({
        message: "Schedule created successfully",
        data: result,
    });
}