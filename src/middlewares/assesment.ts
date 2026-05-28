import { NextFunction, Request, Response } from 'express';
import * as assesmentServices from '../services/assesment';
import { HttpError } from '../utils/error';

export const checkAssesmentIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const assesment = await assesmentServices.getAssesmentById(id);

    if (!assesment) {
        throw new HttpError('Penilaian not found', 404);
    }

    res.locals.assesment = assesment;

    next();
}
