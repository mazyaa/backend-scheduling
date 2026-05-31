import { Request, Response } from 'express';
import * as eSertifikatService from '../services/e-sertifikat';

export const publishSertifikat = async (req: Request, res: Response): Promise<void> => {
    const { penilaianId } = req.params;

    const result = await eSertifikatService.publishSertifikat(penilaianId);

    res.status(201).json({
        message: 'E-Sertifikat published successfully!',
        data: result,
    });
};

export const downloadSertifikatZip = async (req: Request, res: Response): Promise<void> => {
    const { penilaianId } = req.params;
    const currentUser = res.locals.currentUserLogin;

    await eSertifikatService.downloadSertifikatZip(penilaianId, currentUser, res);
};

export const getAllPeserta = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const search = (req.query.search?.toString().trim() as string) || undefined;

    const result = await eSertifikatService.getAllPeserta(id, {
        page,
        limit,
        search,
    });

    res.status(200).json({
        message: 'Daftar peserta retrieved successfully!',
        data: result.data,
        pagination: result.pagination,
    });
};
