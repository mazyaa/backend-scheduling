import { Request, Response } from 'express';
import { IUserWithoutPassword } from '../utils/interfaces';
import * as myTrainingService from '../services/myTraining';

export const getMyTraining = async (req: Request, res: Response): Promise<void> => {
    const currentUser = res.locals.currentUserLogin as IUserWithoutPassword;
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);

    const result = await myTrainingService.getMyTraining(
        currentUser.id,
        currentUser.role,
        page,
        limit,
    );

    res.status(200).json({
        message: 'My training retrieved successfully!',
        data: result.data,
        pagination: result.pagination,
    });
};

export const getDetailJadwal = async (req: Request, res: Response): Promise<void> => {
    const { jadwalTrainingId } = req.params;

    const result = await myTrainingService.getDetailJadwal(jadwalTrainingId);

    res.status(200).json({
        message: 'Detail jadwal retrieved successfully!',
        data: result,
    });
};

export const getSesiDetail = async (req: Request, res: Response): Promise<void> => {
    const { detailJadwalId } = req.params;
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);

    const result = await myTrainingService.getSesiDetail(detailJadwalId, page, limit);

    res.status(200).json({
        message: 'Sesi detail retrieved successfully!',
        data: result.data,
        pagination: result.pagination,
    });
};
