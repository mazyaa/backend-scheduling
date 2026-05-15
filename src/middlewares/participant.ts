import { Request, Response, NextFunction } from 'express';
import * as participantRepo from '../repositories/participant';
import { prisma } from '../utils/client';
import { HttpError } from '../utils/error';

export const checkPesertaId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const participant = await participantRepo.getPesertaById(id);
        
        if (!participant) {
            throw new HttpError('Peserta tidak ditemukan', 404);
        }
        
        res.locals.participant = participant;
        next();
    } catch (error) {
        next(error);
    }
};

export const checkDuplicatePeserta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, noWa } = req.body;
        const { id } = req.params;

        const orConditions: any[] = [];
        if (email) orConditions.push({ email });
        if (noWa) orConditions.push({ noWa });

        if (orConditions.length > 0) {
            const query: any = {
                where: { OR: orConditions }
            };
            
            // Exclude current user when updating
            if (id) {
                query.where.id = { not: id };
            }

            const existing = await prisma.user.findFirst(query);
            
            if (existing) {
                if (existing.email === email) {
                    throw new HttpError('Email sudah terdaftar', 400);
                }
                if (existing.noWa === noWa) {
                    throw new HttpError('Nomor WhatsApp sudah terdaftar', 400);
                }
            }
        }
        
        next();
    } catch (error) {
        next(error);
    }
};
