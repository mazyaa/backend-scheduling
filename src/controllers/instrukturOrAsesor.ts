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

export const getInstrukturOrAsesorByName = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.query as { name: string };

    const result = await instrukturOrAsesorServices.getInstrukturOrAsesorByName(name);

    res.status(200).json({
        message: 'User(s) Retrieved Successfully!',
        data: result,
    });
}

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

// export const getAllInstrukturAndAsesor = async (req: Request, res: Response): Promise<void> => {
//     const result = await instrukturOrAsesorServices.getAllInstrukturAndAsesor();

//     res.status(200).json({
//         message: 'All Users Retrieved Successfully!',
//         data: result,
//     });
// }