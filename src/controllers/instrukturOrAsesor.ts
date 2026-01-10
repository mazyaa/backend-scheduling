import { Request, Response } from 'express';
import * as instrukturOrAsesorServices from '../services/instrukturOrAsesor';

export const createInstrukturAndAsesor = async (req: Request, res: Response): Promise<void> => {
    const { name, email, noWa, role, password, keahlian } = req.body;

    const result = await instrukturOrAsesorServices.createInstrukturAndAsesor({
        name,   
        email,
        noWa,
        role,
        password,
        keahlian,
    });

    res.status(201).json({
        message: 'User Created Successfully!',
        data: result,
    });
}