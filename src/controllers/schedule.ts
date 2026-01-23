import { Request, Response } from "express";
import { ICreateSchedule } from "../utils/interfaces";
import * as scheduleServices from "../services/schedule";

export const createSchedule = async (req: Request, res: Response): Promise<void> => {
    const payload = req.body as ICreateSchedule;

    const result = await scheduleServices.createSchedule(payload);

    res.status(201).json({
        message: "Schedule created successfully",
        data: result,
    });
}

export const getScheduleById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await scheduleServices.getScheduleById(id);

    res.status(200).json({
        message: "Schedule retrieved sucessfully",
        data: result,
    });
}

export const updateSchedule = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const payload = req.body as Partial<Omit<ICreateSchedule, 'detailJadwal'>>;

    const result = await scheduleServices.updateSchedule(id, payload);

    res.status(200).json({
        message: "Schedule updated successfully",
        data: result,
    });
}