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

export const getAllSchedules = async (req: Request, res: Response): Promise<void> => {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const search = (req.query.search?.toString().trim() as string) || undefined;

    const result = await scheduleServices.getAllSchedules({
        page,
        limit,
        search,
    });
    
    res.status(200).json({
        message: "Schedules retrieved successfully",
        data: result.data,
        pagination: result.pagination,
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

export const deleteSchedule = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await scheduleServices.deleteSchedule(id);

    res.status(200).json({
        message: "Schedule deleted successfully",
        data: result,
    })
}