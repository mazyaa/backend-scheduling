import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import puppeteer from 'puppeteer';
import archiver from 'archiver';
import { Response } from 'express';

import { HttpError } from '../utils/error';
import { generateNomorSertifikat } from '../utils/sertifikat';
import * as eSertifikatRepository from '../repositories/e-sertifikat';
import * as assesmentRepository from '../repositories/assesment';
import { prisma } from '../utils/client';
import { Prisma } from '@prisma/client';

export const publishSertifikat = async (penilaianId: string) => {
  /**
   * 1. Get Assessment
   */
  const assesment = await assesmentRepository.getAssesmentById(penilaianId);

  if (!assesment) {
    throw new HttpError('Penilaian tidak ditemukan.', 404);
  }

  /**
   * 2. Validate Kompetensi
   */
  if (assesment.statusKompetensi !== 'kompeten') {
    throw new HttpError(
      'Peserta belum kompeten, tidak dapat menerbitkan sertifikat. Silahkan gunakan fitur revisi.',
      400,
    );
  }

  /**
   * 3. Prevent Duplicate Publish
   */
  const isExists =
    await eSertifikatRepository.checkSertifikatExists(penilaianId);

  if (isExists) {
    throw new HttpError(
      'Sertifikat untuk penilaian ini sudah pernah diterbitkan.',
      400,
    );
  }

  /**
   * 4. Get Materi Training
   */
  const materiList = await prisma.materiTraining.findMany({
    where: {
      detailJadwalTraining: {
        jadwalTrainingId: assesment.jadwalTrainingId,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  if (!materiList.length) {
    throw new HttpError('Tidak ada materi pada jadwal training ini.', 400);
  }

  /**
   * 5. Certificate Template
   */
  const templatePath = path.join(__dirname, '../templates/certificate.ejs');

  if (!fs.existsSync(templatePath)) {
    throw new HttpError('Template sertifikat tidak ditemukan.', 500);
  }

  /**
   * 6. Background Image
   */
  const backgroundPath = path.join(
    process.cwd(),
    'src',
    'assets',
    'certificate',
    'background.png',
  );

  if (!fs.existsSync(backgroundPath)) {
    throw new HttpError('Background sertifikat tidak ditemukan.', 500);
  }

  const backgroundImage = `data:image/png;base64,${fs
    .readFileSync(backgroundPath)
    .toString('base64')}`;

  /**
   * 7. Date Format
   */
  const today = new Date();

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const tanggalTerbitStr = today.toLocaleDateString('id-ID', dateOptions);

  const tanggalTrainingStr =
    assesment.jadwalTraining.startDate.toLocaleDateString('id-ID', dateOptions);

  /**
   * 8. Generate Number
   */
  const currentYear = today.getFullYear();

  let currentCount =
    await eSertifikatRepository.countSertifikatThisYear(currentYear);

  /**
   * 9. Storage Directory
   */
  const baseDir = path.join(
    process.cwd(),
    'uploads',
    'sertifikat',
    assesment.userId,
    assesment.jadwalTrainingId,
  );

  fs.mkdirSync(baseDir, {
    recursive: true,
  });

  /**
   * 10. Browser
   */
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const sertifikatDataInsert: Prisma.SertifikatCreateManyInput[] = [];

  try {
    for (const materi of materiList) {
      currentCount++;

      const nomorSertifikat = generateNomorSertifikat(
        currentCount,
        materi.judul,
        today,
      );

      /**
       * Render Template
       */
      const html = await ejs.renderFile(templatePath, {
        backgroundImage,

        nomorSertifikat,

        namaPeserta: assesment.user.name,

        namaMateri: materi.judul,

        namaTraining: assesment.jadwalTraining.training.namaTraining,

        batch: assesment.jadwalTraining.batch,

        tanggalTraining: tanggalTrainingStr,

        tanggalTerbit: tanggalTerbitStr,
      });

      /**
       * PDF Page
       */
      const page = await browser.newPage();

      await page.setContent(html, {
        waitUntil: 'networkidle0' as any,
      });

      const safeMateriName = materi.judul
        .replace(/[^a-zA-Z0-9]/g, '_')
        .toLowerCase();

      const fileName = `${safeMateriName}.pdf`;

      const absolutePath = path.join(baseDir, fileName);

      /**
       * Generate PDF
       */
      await page.pdf({
        path: absolutePath,
        format: 'A4',
        landscape: true,
        printBackground: true,
        preferCSSPageSize: true,
      });

      await page.close();

      const dbPath = `uploads/sertifikat/${assesment.userId}/${assesment.jadwalTrainingId}/${fileName}`;

      /**
       * Prepare Insert
       */
      sertifikatDataInsert.push({
        penilaianId: assesment.id,

        materiTrainingId: materi.id,

        nomorSertifikat,

        fileSertifikat: dbPath,
      });
    }
  } finally {
    await browser.close();
  }

  /**
   * 11. Save Database
   */
  await eSertifikatRepository.createSertifikatBatch(sertifikatDataInsert);

  return {
    totalSertifikat: sertifikatDataInsert.length,

    message: `${sertifikatDataInsert.length} sertifikat berhasil diterbitkan.`,
  };
};

export const downloadSertifikatZip = async (
  penilaianId: string,
  res: Response,
) => {
  const assesment = await assesmentRepository.getAssesmentById(penilaianId);

  if (!assesment) {
    throw new HttpError('Penilaian not found', 404);
  }

  const sertifikatList =
    await eSertifikatRepository.getSertifikatByPenilaianId(penilaianId);

  if (!sertifikatList || sertifikatList.length === 0) {
    throw new HttpError('Sertifikat belum diterbitkan.', 404);
  }

  const userNameSafe = assesment.user.name.replace(/[^a-z0-9]/gi, '_');
  const zipFileName = `${userNameSafe}.zip`;

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename="${zipFileName}"`);

  const archive = archiver('zip', {
    zlib: { level: 9 }, // max compression
  });

  archive.on('error', (err) => {
    throw new HttpError(`Error creating ZIP: ${err.message}`, 500);
  });

  archive.pipe(res);

  for (const cert of sertifikatList) {
    const filePathAbsolute = path.join(process.cwd(), cert.fileSertifikat);
    if (fs.existsSync(filePathAbsolute)) {
      const safeMateriName = cert.materiTraining.judul.replace(
        /[^a-z0-9]/gi,
        '_',
      );
      const pdfName = `${safeMateriName}.pdf`;
      archive.append(fs.createReadStream(filePathAbsolute), { name: pdfName });
    }
  }

  await archive.finalize();
};
