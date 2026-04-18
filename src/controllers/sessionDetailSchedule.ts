import { Request, Response } from 'express';
import * as sessionDetailScheduleService from '../services/sessionDetailSchedule';
import { ISessionDetailSchedule } from '../utils/interfaces';

export const generateSessionDetailSchedules = async (_req: Request, res: Response) => {
    const detailScheduleId = res.locals.detailSchedule.id;
    const result = await sessionDetailScheduleService.generateSessionDetaiSchedules(detailScheduleId);

    res.status(201).json({
        message: "Session detail schedule created successfully!",
        data: result,
    });
}

export const createSessionDetailSchedule = async (req: Request, res: Response) => {
    const payload = req.body as ISessionDetailSchedule;

    const result = await sessionDetailScheduleService.createSessionDetailSchedule(payload);

    res.status(201).json({
        message: "Session detail schedule created successfully!",
        data: result,
    });
}

export const getSessionDetailScheduleById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await sessionDetailScheduleService.getSessionDetailScheduleById(id);

    res.status(200).json({
        message: "Session detail schedule retrieved successfully!",
        data: result,
    });
}

export const updateSessionDetailSchedule = async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body as ISessionDetailSchedule;

    const result = await sessionDetailScheduleService.updateSessionDetailSchedule(id, payload);

    res.status(200).json({
        message: "Session detail schedule updated successfully!",
        data: result,
    });
}

export const deleteSessionDetailSchedule = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await sessionDetailScheduleService.deleteSessionDetailSchedule(id);

    res.status(200).json({
        message: "Session detail schedule deleted successfully!",
        data: result,
    });
}

export const getAllSessionDetailSchedules = async (req: Request, res: Response) => {
    const page = Math.max(Number(req.query.page) || 1, 1); 
    const limit = Math.max(Number(req.query.limit) || 10, 1); 
    const search = (req.query.search?.toString().trim() as string) || undefined; 

    const detailScheduleId = res.locals.detailSchedule.id;

    const result = await sessionDetailScheduleService.getAllSessionDetailSchedule({
        page,
        limit,
        search,
        filter: detailScheduleId,
    });

    res.status(200).json({
        message: "Session detail schedule retrieved successfully!",
        data: result.data,
        pagination: result.pagination,
    });
}