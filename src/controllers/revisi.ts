import { Request, Response } from 'express';
import { IUserWithoutPassword } from '../utils/interfaces';
import * as revisiService from '../services/revisi';

export const uploadRevisiAdmin = async (req: Request, res: Response): Promise<void> => {
    const { penilaianId } = req.params;
    const file = req.file as Express.Multer.File;

    const result = await revisiService.uploadRevisiAdmin(penilaianId, file);

    res.status(200).json({
        message: 'File revisi berhasil diupload!',
        data: result,
    });
};

export const downloadRevisiFile = async (req: Request, res: Response): Promise<void> => {
    const { penilaianId } = req.params;
    const currentUser = res.locals.currentUserLogin;

    await revisiService.downloadRevisiFile(penilaianId, currentUser, res);
};

export const uploadRevisiPeserta = async (req: Request, res: Response): Promise<void> => {
    const { penilaianId } = req.params;
    const file = req.file as Express.Multer.File;
    const currentUser = res.locals.currentUserLogin as IUserWithoutPassword;

    const result = await revisiService.uploadRevisiPeserta(
        penilaianId,
        file,
        currentUser,
    );

    res.status(200).json({
        message: 'File revisi peserta berhasil diupload!',
        data: result,
    });
};

export const downloadRevisiPesertaFile = async (req: Request, res: Response): Promise<void> => {
    const { penilaianId } = req.params;
    const currentUser = res.locals.currentUserLogin;

    await revisiService.downloadRevisiPesertaFile(penilaianId, currentUser, res);
};

export const setujuiRevisi = async (req: Request, res: Response): Promise<void> => {
    const { penilaianId } = req.params;

    const result = await revisiService.setujuiRevisi(penilaianId);

    res.status(200).json({
        message: 'Revisi disetujui!',
        data: result,
    });
};

export const tolakRevisi = async (req: Request, res: Response): Promise<void> => {
    const { penilaianId } = req.params;

    const result = await revisiService.tolakRevisi(penilaianId);

    res.status(200).json({
        message: 'Revisi ditolak!',
        data: result,
    });
};
