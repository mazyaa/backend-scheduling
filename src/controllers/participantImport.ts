import { Request, Response } from 'express';
import * as participantImportService from '../services/participantImport';
import { HttpError } from '../utils/error';

export const previewImport = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
        throw new HttpError('File Excel tidak ditemukan', 400);
    }

    const { buffer, mimetype } = req.file;
    if (mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        throw new HttpError('Format file tidak didukung. Harap upload file .xlsx', 400);
    }

    const result = await participantImportService.previewImport(buffer);

    res.status(200).json({
        message: 'Preview import berhasil digenerate',
        data: result
    });
};

export const commitImport = async (req: Request, res: Response): Promise<void> => {
    const { jadwalTrainingId, participants } = req.body;

    const result = await participantImportService.commitImport(jadwalTrainingId, participants);

    res.status(201).json({
        message: 'Import peserta berhasil',
        data: {
            insertedCount: result.length
        }
    });
};
