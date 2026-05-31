import { Request, Response } from 'express';
import * as laporanService from '../services/laporan';

export const getLaporanSertifikat = async (req: Request, res: Response): Promise<void> => {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const search = (req.query.search?.toString().trim() as string) || undefined;
    const batch = (req.query.batch?.toString().trim() as string) || undefined;

    const result = await laporanService.getLaporanSertifikat({
        page,
        limit,
        search,
        batch,
    });

    res.status(200).json({
        message: 'Laporan sertifikat retrieved successfully!',
        data: result.data,
        pagination: result.pagination,
    });
};

export const getLaporanPeserta = async (req: Request, res: Response): Promise<void> => {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const search = (req.query.search?.toString().trim() as string) || undefined;
    const batch = (req.query.batch?.toString().trim() as string) || undefined;
    const status = (req.query.status?.toString().trim() as string) || undefined;

    const result = await laporanService.getLaporanPeserta({
        page,
        limit,
        search,
        batch,
        status,
    });

    res.status(200).json({
        message: 'Laporan peserta retrieved successfully!',
        data: result.data,
        pagination: result.pagination,
    });
};
