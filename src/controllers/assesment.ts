import { Request, Response } from 'express';
import * as assesmentServices from '../services/assesment';
import { ICreateAssesment } from '../utils/interfaces';

export const createAssesment = async (req: Request, res: Response): Promise<void> => {
    const payload = req.body as ICreateAssesment;

    const result = await assesmentServices.createAssesment(payload);

    res.status(201).json({
        message: 'Penilaian created successfully!',
        data: result,
    });
}

export const getAssesmentById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await assesmentServices.getAssesmentById(id);

    res.status(200).json({
        message: 'Penilaian retrieved successfully!',
        data: result,
    });
}

export const getAllAssesment = async (req: Request, res: Response): Promise<void> => {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const search = (req.query.search?.toString().trim() as string) || undefined;
    
    const jadwalTrainingId = res.locals.schedule.id;

    const result = await assesmentServices.getAllAssesment({
        page,
        limit,
        search,
        filter: jadwalTrainingId,
    });

    res.status(200).json({
        message: 'Penilaian retrieved successfully!',
        data: result.data,
        pagination: result.pagination,
    });
}

export const updateAssesment = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const payload = req.body as Partial<ICreateAssesment>;

    const result = await assesmentServices.updateAssesment(id, payload);

    res.status(200).json({
        message: 'Penilaian updated successfully!',
        data: result,
    });
}

export const deleteAssesment = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await assesmentServices.deleteAssesment(id);

    res.status(200).json({
        message: 'Penilaian deleted successfully!',
        data: result,
    });
}
