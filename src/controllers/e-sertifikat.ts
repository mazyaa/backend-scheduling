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

    // This service handles the response stream directly
    await eSertifikatService.downloadSertifikatZip(penilaianId, res);
};
