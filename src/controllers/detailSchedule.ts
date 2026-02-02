import { Request, Response } from "express";
import * as detailScheduleServices from "../services/detailSchedule";

export const createDetailSchedule = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const{ trainingId } = res.locals.detailSchedule;
    const payload = req.body;

    const newDetailSchedule = await detailScheduleServices.createDetailSchedule(id, payload, trainingId);

    res.status(201).json({
        message: "Detail schedule created successfully",
        data: newDetailSchedule,
    });
};

export const getDetailScheduleById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await detailScheduleServices.getDetailScheduleById(id);

    res.status(200).json({
        message: "Detail schedule retrieved successfully",
        data: result,
    });
};

export const getAllDetailSchedules = async (req: Request, res: Response): Promise<void> => {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const search = (req.query.search?.toString().trim() as string);

    const result = await detailScheduleServices.getAllDetailSchedules({
        page,
        limit,
        search,
    });

    res.status(200).json({
        message: "Detail schedule retrieved successfully",
        data: result.data,
        pagination: result.pagination,
    });
};

export const updateDetailSchedule = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const{ trainingId } = res.locals.detailSchedule;
    const payload = req.body;

    const newDetailSchedule = await detailScheduleServices.createDetailSchedule(id, payload, trainingId);

    res.status(201).json({
        message: "Detail schedule created successfully",
        data: newDetailSchedule,
    });
};