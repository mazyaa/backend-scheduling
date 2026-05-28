import { NextFunction, Request, Response } from 'express';
import * as materiServices from '../services/materi';
import { HttpError } from '../utils/error';

export const checkMateriIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const materi = await materiServices.getMateriById(id);

    if (!materi) {
        throw new HttpError('Materi not found', 404);
    }

    res.locals.materi = materi;

    next();
}
