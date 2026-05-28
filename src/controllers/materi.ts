import { Request, Response } from 'express';
import * as materiServices from '../services/materi';
import { ICreateMateri, IUserWithoutPassword } from '../utils/interfaces';

export const createMateri = async (req: Request, res: Response): Promise<void> => {
    const currentUser = res.locals.currentUserLogin as IUserWithoutPassword;

    const payload: ICreateMateri = {
        ...(req.body as Omit<ICreateMateri, 'diuploadOleh'>),
        diuploadOleh: currentUser.id,
    };

    const result = await materiServices.createMateri(payload);

    res.status(201).json({
        message: 'Materi created successfully!',
        data: result,
    });
}

export const getMateriById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await materiServices.getMateriById(id);

    res.status(200).json({
        message: 'Materi retrieved successfully!',
        data: result,
    });
}

export const getAllMateri = async (req: Request, res: Response): Promise<void> => {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const search = (req.query.search?.toString().trim() as string) || undefined;
    
    const detailScheduleId = res.locals.detailSchedule.id;

    const result = await materiServices.getAllMateri({
        page,
        limit,
        search,
        filter: detailScheduleId,
    });

    res.status(200).json({
        message: 'Materi retrieved successfully!',
        data: result.data,
        pagination: result.pagination,
    });
}

export const updateMateri = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const payload = req.body as Partial<ICreateMateri>;

    const result = await materiServices.updateMateri(id, payload);

    res.status(200).json({
        message: 'Materi updated successfully!',
        data: result,
    });
}

export const deleteMateri = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await materiServices.deleteMateri(id);

    res.status(200).json({
        message: 'Materi deleted successfully!',
        data: result,
    });
}
