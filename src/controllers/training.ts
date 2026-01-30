import { Request, Response } from 'express';
import * as trainingServices from '../services/training';
import { ICreateTraining } from '../utils/interfaces';

export const createTraining = async (req: Request, res: Response): Promise<void> => {
    const payload = req.body as ICreateTraining;

    const result = await trainingServices.createTraining(payload);

    res.status(201).json({
        message: 'Training Created Successfully!',
        data: result,
    });
};

export const getTrainingById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await trainingServices.getTrainingById(id);

    res.status(200).json({
        message: 'Training Retrieved Successfully!',
        data: result,
    });
}   

export const getAllTraining = async (req: Request, res: Response): Promise<void> => {
    const page = Math.max(Number(req.query.page) || 1, 1); // get highest value, and set default and minimum page is 1
    const limit = Math.max(Number(req.query.limit) || 10, 1); 
    const search = (req.query.search?.toString().trim() as string) || undefined; // trim to remove whitespace

    const result = await trainingServices.getAllTraining({
        page,
        limit,
        search,
    });

    res.status(200).json({
        message: 'Trainings Retrieved Successfully!',
        data: result.data,
        pagination: result.pagination,
    });
}

export const updateTraining = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const payload = req.body as Partial<ICreateTraining>;
    const existingTraining = res.locals.training

    const result = await trainingServices.updateTraining(id, payload, existingTraining);

    res.status(200).json({
        message: 'Training Updated Successfully!',
        data: result,
    });
}


export const deleteTraining = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await trainingServices.deleteTraining(id);

    res.status(200).json({
        message: 'Training Deleted Successfully!',
        data: result,
    });
}