import { Request, Response } from 'express';
import * as dashboardService from '../services/dashboard';

export const getDashboard = async (req: Request, res: Response): Promise<void> => {
    const year = req.query.year ? Number(req.query.year) : undefined;

    const result = await dashboardService.getDashboard(year);

    res.status(200).json({
        message: 'Dashboard retrieved successfully!',
        data: result,
    });
};
