import { Request, Response } from 'express';
import * as materiServices from '../services/materi';
import { ICreateMateri, IUserWithoutPassword } from '../utils/interfaces';

export const getMateriById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await materiServices.getMateriById(id);

    res.status(200).json({
        message: 'Materi retrieved successfully!',
        data: result,
    });
}

export const getAllMateri = async (req: Request, res: Response): Promise<void> => {
    const currentUser = res.locals.currentUserLogin as IUserWithoutPassword;
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const search = (req.query.search?.toString().trim() as string) || undefined;

    const result = await materiServices.getAllMateri(
        currentUser.id,
        currentUser.role,
        page,
        limit,
        search,
    );

    res.status(200).json({
        message: 'Materi retrieved successfully!',
        data: result.data,
        pagination: result.pagination,
    });
}

export const updateMateri = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { fileMateri: _fileMateri, ...payload } = req.body as Partial<ICreateMateri>;
    const file = req.file as Express.Multer.File | undefined;

    const result = await materiServices.updateMateri(id, payload, file);

    res.status(200).json({
        message: 'Materi updated successfully!',
        data: result,
    });
}

export const deleteMateri = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await materiServices.deleteMateri(id);

    res.status(200).json({
        message: 'Materi deleted successfully!',
        data: result,
    });
}

export const uploadMateri = async (req: Request, res: Response): Promise<void> => {
    const { detailJadwalTrainingId, judul } = req.body;
    const file = req.file as Express.Multer.File;
    const currentUser = res.locals.currentUserLogin as IUserWithoutPassword;

    const result = await materiServices.uploadMateri(
        detailJadwalTrainingId,
        judul,
        file,
        currentUser.id,
    );

    res.status(200).json({
        message: 'Materi berhasil diupload!',
        data: result,
    });
}

export const downloadMateri = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    await materiServices.downloadMateri(id, res);
}

export const getMyMateri = async (req: Request, res: Response): Promise<void> => {
    const currentUser = res.locals.currentUserLogin as IUserWithoutPassword;
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const search = (req.query.search?.toString().trim() as string) || undefined;

    const result = await materiServices.getMyMateri(
        currentUser.id,
        currentUser.role,
        page,
        limit,
        search,
    );

    res.status(200).json({
        message: 'Materi retrieved successfully!',
        data: result.data,
        pagination: result.pagination,
    });
}
