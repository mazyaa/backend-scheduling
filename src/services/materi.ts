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
import * as userRepository from '../repositories/user';

export const createMateri = async (
  payload: ICreateMateri,
): Promise<IMateri> => {
  const { detailJadwalTrainingId, diuploadOleh } = payload;

  const detailSchedule =
    await detailScheduleRepository.getDetailScheduleById(detailJadwalTrainingId);

  if (!detailSchedule) {
    throw new HttpError('Detail schedule not found', 404);
  }

  const uploader = await userRepository.getUserById(diuploadOleh);

  if (!uploader) {
    throw new HttpError('Uploader not found', 404);
  }

  const data = await materiRepository.createMateri(payload);

  return data;
};

export const getMateriById = async (id: string) => {
  const data = await materiRepository.getMateriById(id);

  return data;
};

export const updateMateri = async (
  id: string,
  payload: Partial<ICreateMateri>,
): Promise<IMateri> => {
  if (payload.detailJadwalTrainingId) {
    const detailSchedule = await detailScheduleRepository.getDetailScheduleById(
      payload.detailJadwalTrainingId,
    );

    if (!detailSchedule) {
      throw new HttpError('Detail schedule not found', 404);
    }
  }

  const data = await materiRepository.updateMateri(id, payload);

  return data;
};

export const deleteMateri = async (id: string): Promise<IMateri> => {
  const data = await materiRepository.deleteMateri(id);

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
  const ext = path.extname(file.originalname);
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

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${fileName}"`,
  );

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
