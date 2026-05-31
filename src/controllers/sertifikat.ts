import { Request, Response } from 'express';
import * as sertifikatService from '../services/sertifikat';

export const verifySertifikat = async (req: Request, res: Response): Promise<void> => {
    const { nomorSertifikat } = req.body;

    const result = await sertifikatService.verifySertifikat(nomorSertifikat);

    res.status(200).json({
        message: 'Sertifikat valid!',
        data: result,
    });
};
