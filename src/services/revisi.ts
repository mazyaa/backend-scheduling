import path from 'path';
import fs from 'fs';
import { Response } from 'express';
import { RoleUser, StatusRevisi } from '@prisma/client';

import { HttpError } from '../utils/error';
import * as revisiRepository from '../repositories/revisi';
import * as assesmentRepository from '../repositories/assesment';

export const uploadRevisiAdmin = async (
  penilaianId: string,
  file: Express.Multer.File,
) => {
  const assesment = await assesmentRepository.getAssesmentById(penilaianId);

  if (!assesment) {
    throw new HttpError('Penilaian tidak ditemukan.', 404);
  }

  if (!file) {
    throw new HttpError('File revisi harus diupload.', 400);
  }

  const filePath = `uploads/revisi/${penilaianId}/${file.filename}`;

  const existingRevisi =
    await revisiRepository.getRevisiByPenilaianId(penilaianId);

  if (existingRevisi) {
    if (existingRevisi.fileRevisiAdmin) {
      const oldFilePath = path.join(process.cwd(), existingRevisi.fileRevisiAdmin);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    const updated = await revisiRepository.updateRevisi(
      penilaianId,
      filePath,
    );

    return {
      penilaianId: updated.penilaianId,
      fileRevisiAdmin: updated.fileRevisiAdmin,
      status: updated.status,
    };
  }

  const created = await revisiRepository.createRevisi(
    penilaianId,
    filePath,
  );

  return {
    penilaianId: created.penilaianId,
    fileRevisiAdmin: created.fileRevisiAdmin,
    status: created.status,
  };
};

export const downloadRevisiFile = async (
  penilaianId: string,
  currentUser: { id: string; role: string },
  res: Response,
) => {
  const assesment = await assesmentRepository.getAssesmentById(penilaianId);

  if (!assesment) {
    throw new HttpError('Penilaian tidak ditemukan.', 404);
  }

  if (
    currentUser.role !== RoleUser.admin &&
    assesment.userId !== currentUser.id
  ) {
    throw new HttpError(
      'Forbidden: Anda tidak memiliki akses ke file revisi peserta ini',
      403,
    );
  }

  const revisi =
    await revisiRepository.getRevisiByPenilaianId(penilaianId);

  if (!revisi || !revisi.fileRevisiAdmin) {
    throw new HttpError('File revisi belum diupload.', 404);
  }

  const filePathAbsolute = path.join(process.cwd(), revisi.fileRevisiAdmin);

  if (!fs.existsSync(filePathAbsolute)) {
    throw new HttpError('File revisi tidak ditemukan di server.', 404);
  }

  const fileName = path.basename(revisi.fileRevisiAdmin);

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${fileName}"`,
  );

  const fileStream = fs.createReadStream(filePathAbsolute);
  fileStream.pipe(res);
};

export const uploadRevisiPeserta = async (
  penilaianId: string,
  file: Express.Multer.File,
  currentUser: { id: string; role: string },
) => {
  const assesment = await assesmentRepository.getAssesmentById(penilaianId);

  if (!assesment) {
    throw new HttpError('Penilaian tidak ditemukan.', 404);
  }

  if (assesment.userId !== currentUser.id) {
    throw new HttpError('Forbidden: Anda tidak memiliki akses ke penilaian ini.', 403);
  }

  if (!file) {
    throw new HttpError('File revisi harus diupload.', 400);
  }

  const filePath = `uploads/revisi/${penilaianId}/${file.filename}`;

  const existingRevisi =
    await revisiRepository.getRevisiByPenilaianId(penilaianId);

  if (existingRevisi?.fileRevisiPeserta) {
    const oldFilePath = path.join(process.cwd(), existingRevisi.fileRevisiPeserta);
    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }
  }

  const updated = await revisiRepository.updateRevisiPeserta(penilaianId, filePath);

  return {
    penilaianId: updated.penilaianId,
    fileRevisiPeserta: updated.fileRevisiPeserta,
    status: updated.status,
  };
};

export const downloadRevisiPesertaFile = async (
  penilaianId: string,
  currentUser: { id: string; role: string },
  res: Response,
) => {
  const assesment = await assesmentRepository.getAssesmentById(penilaianId);

  if (!assesment) {
    throw new HttpError('Penilaian tidak ditemukan.', 404);
  }

  if (
    currentUser.role !== RoleUser.admin &&
    currentUser.role !== RoleUser.asesor &&
    assesment.userId !== currentUser.id
  ) {
    throw new HttpError(
      'Forbidden: Anda tidak memiliki akses ke file revisi peserta ini',
      403,
    );
  }

  const revisi =
    await revisiRepository.getRevisiByPenilaianId(penilaianId);

  if (!revisi || !revisi.fileRevisiPeserta) {
    throw new HttpError('File revisi peserta belum diupload.', 404);
  }

  const filePathAbsolute = path.join(process.cwd(), revisi.fileRevisiPeserta);

  if (!fs.existsSync(filePathAbsolute)) {
    throw new HttpError('File revisi peserta tidak ditemukan di server.', 404);
  }

  const fileName = path.basename(revisi.fileRevisiPeserta);

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${fileName}"`,
  );

  const fileStream = fs.createReadStream(filePathAbsolute);
  fileStream.pipe(res);
};

export const setujuiRevisi = async (penilaianId: string) => {
  const revisi = await revisiRepository.getRevisiByPenilaianId(penilaianId);

  if (!revisi) {
    throw new HttpError('Revisi tidak ditemukan.', 404);
  }

  const updated = await revisiRepository.updateStatusRevisi(
    penilaianId,
    StatusRevisi.disetujui,
  );

  return {
    penilaianId: updated.penilaianId,
    status: updated.status,
  };
};

export const tolakRevisi = async (penilaianId: string) => {
  const revisi = await revisiRepository.getRevisiByPenilaianId(penilaianId);

  if (!revisi) {
    throw new HttpError('Revisi tidak ditemukan.', 404);
  }

  const updated = await revisiRepository.updateStatusRevisi(
    penilaianId,
    StatusRevisi.ditolak,
  );

  return {
    penilaianId: updated.penilaianId,
    status: updated.status,
  };
};
