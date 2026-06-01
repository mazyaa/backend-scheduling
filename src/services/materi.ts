import path from 'path';
import fs from 'fs';
import { Response } from 'express';

import {
  ICreateMateri,
  IMateri,
  IPaginationQuery,
  IResultPagination,
} from '../utils/interfaces';
import { HttpError } from '../utils/error';
import * as materiRepository from '../repositories/materi';
import * as detailScheduleRepository from '../repositories/detailSchedule';

const storeMateriFile = (materiId: string, file: Express.Multer.File): string => {
  const ext = getMateriFileExtension(file.mimetype, file.originalname);
  const newFileName = `materi_${Date.now()}${ext}`;
  const newDir = path.join(process.cwd(), 'uploads', 'materi', materiId);

  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir, { recursive: true });
  }

  const newPath = path.join(newDir, newFileName);
  fs.renameSync(file.path, newPath);

  return `uploads/materi/${materiId}/${newFileName}`;
};

const getMateriFileExtension = (mimetype: string, originalName: string): string => {
  if (mimetype === 'application/pdf') {
    return '.pdf';
  }

  if (mimetype === 'application/msword') {
    return '.doc';
  }

  if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return '.docx';
  }

  return path.extname(originalName).toLowerCase();
};

const getMateriDownloadHeaders = (fileName: string): { contentType: string; contentDisposition: string } => {
  const ext = path.extname(fileName).toLowerCase();

  if (ext === '.pdf') {
    return {
      contentType: 'application/pdf',
      contentDisposition: `attachment; filename="${fileName}"`,
    };
  }

  if (ext === '.doc') {
    return {
      contentType: 'application/msword',
      contentDisposition: `attachment; filename="${fileName}"`,
    };
  }

  if (ext === '.docx') {
    return {
      contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      contentDisposition: `attachment; filename="${fileName}"`,
    };
  }

  if (ext === '.ppt') {
    return {
      contentType: 'application/vnd.ms-powerpoint',
      contentDisposition: `attachment; filename="${fileName}"`,
    };
  }

  if (ext === '.pptx') {
    return {
      contentType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      contentDisposition: `attachment; filename="${fileName}"`,
    };
  }

  return {
    contentType: 'application/octet-stream',
    contentDisposition: `attachment; filename="${fileName}"`,
  };
};

const removeFileIfExists = (filePath?: string | null): void => {
  if (!filePath) {
    return;
  }

  const absolutePath = path.join(process.cwd(), filePath);

  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
};

const removeDirectoryIfExists = (directoryPath?: string | null): void => {
  if (!directoryPath) {
    return;
  }

  const absolutePath = path.isAbsolute(directoryPath)
    ? directoryPath
    : path.join(process.cwd(), directoryPath);

  if (fs.existsSync(absolutePath)) {
    fs.rmSync(absolutePath, { recursive: true, force: true });
  }
};

export const getMateriById = async (id: string) => {
  const data = await materiRepository.getMateriById(id);

  return data;
};

export const updateMateri = async (
  id: string,
  payload: Partial<ICreateMateri>,
  file?: Express.Multer.File,
): Promise<IMateri> => {
  const existingMateri = await materiRepository.getMateriById(id);

  if (!existingMateri) {
    throw new HttpError('Materi not found', 404);
  }

  if (payload.detailJadwalTrainingId) {
    const detailSchedule = await detailScheduleRepository.getDetailScheduleById(
      payload.detailJadwalTrainingId,
    );

    if (!detailSchedule) {
      throw new HttpError('Detail schedule not found', 404);
    }
  }

  const nextPayload: Partial<ICreateMateri> = {
    ...payload,
  };

  const oldFilePath = existingMateri.fileMateri;
  let newFilePath: string | undefined;

  try {
    if (file) {
      newFilePath = storeMateriFile(id, file);
      nextPayload.fileMateri = newFilePath;
    }

    const data = await materiRepository.updateMateri(id, nextPayload);

    if (file && oldFilePath) {
      removeFileIfExists(oldFilePath);
    }

    return data;
  } catch (error) {
    if (newFilePath) {
      removeFileIfExists(newFilePath);
    }

    throw error;
  }
};

export const deleteMateri = async (id: string): Promise<IMateri> => {
  const existingMateri = await materiRepository.getMateriById(id);

  if (!existingMateri) {
    throw new HttpError('Materi not found', 404);
  }

  const data = await materiRepository.deleteMateri(id);

  if (existingMateri.fileMateri) {
    removeDirectoryIfExists(path.dirname(existingMateri.fileMateri));
  }

  return data;
};

export const getAllMateri = async (
  payload: IPaginationQuery,
): Promise<{
  data: any[];
  pagination: IResultPagination;
}> => {
  const { page, limit, search } = payload;

  const skip = (page - 1) * limit;

  const where: any = {};

  if (search?.trim()) {
    where.judul = {
      contains: search.trim(),
      mode: 'insensitive',
    };
  }

  const [data, total] = await Promise.all([
    materiRepository.getAllMateri({
      skip,
      take: limit,
      where,
      orderBy: { createdAt: 'desc' },
    }),
    materiRepository.countMateri(where),
  ]);

  const totalPages = Math.ceil(total / limit);

  const baseUrl = (process.env.BASE_URL || '').replace(/\/+$/, '');

  const mappedData = data.map((item: any) => {
    const jt = item.detailJadwalTraining.jadwalTraining;
    const hari = new Date(item.detailJadwalTraining.hari);
    const dateStr = hari.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return {
      id: item.id,
      namaMateri: item.judul,
      jadwalTraining: `${jt.training.namaTraining} - ${jt.batch}`,
      detailHariTraining: `Hari Ke-${item.detailJadwalTraining.hariKe} - ${dateStr}`,
      fileMateri: item.fileMateri
        ? `http://${baseUrl}/materi/${item.id}/download`
        : null,
      diuploadOleh: item.uploader
    };
  });

  return {
    data: mappedData,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      limit,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  };
};

export const uploadMateri = async (
  detailJadwalTrainingId: string,
  judul: string,
  file: Express.Multer.File,
  currentUserId: string,
) => {
  if (!file) {
    throw new HttpError('File materi harus diupload.', 400);
  }

  const detailSchedule =
    await detailScheduleRepository.getDetailScheduleById(detailJadwalTrainingId);

  if (!detailSchedule) {
    throw new HttpError('Detail jadwal training tidak ditemukan.', 404);
  }

  // Create materi first to get the ID
  const created = await materiRepository.createMateri({
    detailJadwalTrainingId,
    judul,
    fileMateri: null,
    diuploadOleh: currentUserId,
  });

  // Move file to correct folder
  const ext = getMateriFileExtension(file.mimetype, file.originalname);
  const newFileName = `materi_${Date.now()}${ext}`;
  const newDir = path.join(process.cwd(), 'uploads', 'materi', created.id);

  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir, { recursive: true });
  }

  const oldPath = file.path;
  const newPath = path.join(newDir, newFileName);
  fs.renameSync(oldPath, newPath);

  const filePath = `uploads/materi/${created.id}/${newFileName}`;

  // Update with file path
  const updated = await materiRepository.updateMateri(created.id, {
    fileMateri: filePath,
  });

  return updated;
};

export const downloadMateri = async (
  materiId: string,
  res: Response,
) => {
  const materi = await materiRepository.getMateriById(materiId);

  if (!materi) {
    throw new HttpError('Materi tidak ditemukan.', 404);
  }

  if (!materi.fileMateri) {
    throw new HttpError('File materi belum diupload.', 404);
  }

  const filePathAbsolute = path.join(process.cwd(), materi.fileMateri);

  if (!fs.existsSync(filePathAbsolute)) {
    throw new HttpError('File materi tidak ditemukan di server.', 404);
  }

  const fileName = path.basename(materi.fileMateri);
  const { contentType, contentDisposition } = getMateriDownloadHeaders(fileName);

  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Disposition', contentDisposition);

  const fileStream = fs.createReadStream(filePathAbsolute);
  fileStream.pipe(res);
};

export const getMyMateri = async (
  payload: IPaginationQuery,
): Promise<{
  data: any[];
  pagination: IResultPagination;
}> => {
  const { page, limit, search } = payload;

  const skip = (page - 1) * limit;

  const where: any = {};

  if (search?.trim()) {
    where.judul = {
      contains: search.trim(),
      mode: 'insensitive',
    };
  }

  const [data, total] = await Promise.all([
    materiRepository.getAllMateri({
      skip,
      take: limit,
      where,
      orderBy: { createdAt: 'desc' },
    }),
    materiRepository.countMateri(where),
  ]);

  const totalPages = Math.ceil(total / limit);

  const baseUrl = (process.env.BASE_URL || '').replace(/\/+$/, '');

  const mappedData = data.map((item: any) => {
    const jt = item.detailJadwalTraining.jadwalTraining;
    const hari = new Date(item.detailJadwalTraining.hari);
    const dateStr = hari.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return {
      id: item.id,
      namaMateri: item.judul,
      jadwalTraining: `${jt.training.namaTraining} - ${jt.batch}`,
      detailHariTraining: `Hari Ke-${item.detailJadwalTraining.hariKe} - ${dateStr}`,
      fileMateri: item.fileMateri
        ? `http://${baseUrl}/materi/${item.id}/download`
        : null,
    };
  });

  return {
    data: mappedData,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      limit,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  };
};
