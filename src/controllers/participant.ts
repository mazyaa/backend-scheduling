import { Request, Response, NextFunction } from 'express';
import * as participantService from '../services/participant';
import { ICreateParticipant, IPaginationQuery } from '../utils/interfaces';

export const createPeserta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body as ICreateParticipant;
        const result = await participantService.createPeserta(payload);
        res.status(201).json({
            message: 'Berhasil membuat participant',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export const getPesertaById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = res.locals.participant; // Retrieve from middleware
        // Alternatively, use service to safely exclude password
        const safeResult = await participantService.getPesertaById(result.id);
        
        res.status(200).json({
            message: 'Berhasil mengambil detail participant',
            data: safeResult
        });
    } catch (error) {
        next(error);
    }
};

export const getAllParticipant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query: IPaginationQuery = {
            page: parseInt(req.query.page as string) || 1,
            limit: parseInt(req.query.limit as string) || 10,
            search: req.query.search as string,
            jadwalTrainingId: res.locals.schedule?.id || (req.query.jadwalTrainingId as string)
        };

        const result = await participantService.getAllParticipant(query);
        res.status(200).json({
            message: 'Berhasil mengambil daftar participant',
            ...result
        });
    } catch (error) {
        next(error);
    }
};

export const updatePeserta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload = req.body as ICreateParticipant;
        const result = await participantService.updatePeserta(id, payload);
        res.status(200).json({
            message: 'Berhasil mengubah participant',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export const deletePeserta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await participantService.deletePeserta(id);
        res.status(200).json({
            message: 'Berhasil menghapus participant',
            data: result
        });
    } catch (error) {
        next(error);
    }
};
