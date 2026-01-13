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

export const getInstrukturOrAsesorById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await instrukturOrAsesorServices.getInstrukturOrAsesorById(id);

    res.status(200).json({
        message: 'User Retrieved Successfully!',
        data: result,
    });
}

export const getAllInstrukturAndAsesor = async (req: Request, res: Response): Promise<void> => {
    const page = Math.max(Number(req.query.page) || 1, 1); // use math.max to ensure page is at least one, and mean (1, 1) is default value and impossible less than 1
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const search = (req.query.search?.toString().trim() as string) || undefined; 

    const result = await instrukturOrAsesorServices.getAllInstrukturOrAsesor({
        page,
        limit,
        search,
    });

    res.status(200).json({
        message: 'Users Retrieved Successfully!',
        data: result.data,
        pagination: result.pagination,
    });
};

export const updateInstrukturAndAsesor = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, email, noWa, role, password, keahlian } = req.body;

    const result = await instrukturOrAsesorServices.updateInstrukturAndAsesor(id, {
        name,
        email,
        noWa, 
        role,
        password,
        keahlian,
    });

    res.status(200).json({
        message: 'User Updated Successfully!',
        data: result,
    });
}

export const deleteInstrukturAndAsesor = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await instrukturOrAsesorServices.deleteInstrukturAndAsesor(id);

    res.status(200).json({
        message: 'User Deleted Successfully!',
        data: result,
    });
}
