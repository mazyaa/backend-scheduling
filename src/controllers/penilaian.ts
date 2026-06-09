import { Request, Response } from 'express';
import { IUserWithoutPassword } from '../utils/interfaces';
import * as penilaianService from '../services/penilaian';

export const getMyStatus = async (req: Request, res: Response): Promise<void> => {
    const currentUser = res.locals.currentUserLogin as IUserWithoutPassword;
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const search = (req.query.search?.toString().trim() as string) || undefined;

    const result = await penilaianService.getMyStatus(currentUser.id, page, limit, search);

    res.status(200).json({
        message: 'Status kompetensi retrieved successfully!',
        data: result.data,
        pagination: result.pagination,
    });
};

export const getAllPenilaian = async (req: Request, res: Response): Promise<void> => {
    const currentUser = res.locals.currentUserLogin as IUserWithoutPassword;
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const search = (req.query.search?.toString().trim() as string) || undefined;

    const result = await penilaianService.getAllPenilaian(page, limit, search, currentUser.id, currentUser.role);

    res.status(200).json({
        message: 'All penilaian retrieved successfully!',
        data: result.data,
        pagination: result.pagination,
    });
};

export const getPenilaianPeserta = async (req: Request, res: Response): Promise<void> => {
    const { jadwalTrainingId } = req.params;
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const search = (req.query.search?.toString().trim() as string) || undefined;

    const result = await penilaianService.getPenilaianPeserta(
        jadwalTrainingId,
        page,
        limit,
        search,
    );

    res.status(200).json({
        message: 'Penilaian retrieved successfully!',
        data: result.data,
        pagination: result.pagination,
    });
};
