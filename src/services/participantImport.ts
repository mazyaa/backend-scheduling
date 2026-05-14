import { parseExcelToObjects } from '../utils/participantImportParser';
import { mapRowToPayload } from '../utils/participantImportMapper';
import { participantImportRowSchema } from '../utils/participantImportValidator';
import { participantImportRepository } from '../repositories/participantImport';
import { HttpError } from '../utils/error';

export const previewImport = async (fileBuffer: Buffer) => {
  const parsedRows = await parseExcelToObjects(fileBuffer);

  let totalRow = 0;
  let validRowCount = 0;
  let invalidRowCount = 0;
  let skippedRowCount = 0;
  const rowDetail: any[] = [];

  const rawMappedRows = parsedRows.map(({ row, rowNumber }) => mapRowToPayload(row, rowNumber));
  
  const nonEmptyRows = rawMappedRows.filter(r => !r._isEmpty);
  const emptyRows = rawMappedRows.filter(r => r._isEmpty);
  
  const emailsToCheck = nonEmptyRows.map(r => r.email).filter(Boolean) as string[];
  const noWasToCheck = nonEmptyRows.map(r => r.noWa).filter(Boolean) as string[];

  const existingUsers = await participantImportRepository.findDuplicateUsers(emailsToCheck, noWasToCheck);

  const existingEmails = new Set(existingUsers.map(u => u.email));
  const existingNoWas = new Set(existingUsers.map(u => u.noWa));

  const excelEmails = new Set<string>();
  const excelNoWas = new Set<string>();

  for (const empty of emptyRows) {
      totalRow++;
      skippedRowCount++;
      rowDetail.push({
          rowNumber: empty._rowNumber,
          status: 'SKIPPED',
          payload: empty,
          errors: ['Baris kosong']
      });
  }

  for (const row of nonEmptyRows) {
      totalRow++;
      let status = 'VALID';
      const errors: string[] = [];

      const { error } = participantImportRowSchema.validate(row, { abortEarly: false });
      if (error) {
          status = 'INVALID';
          errors.push(...error.details.map(d => d.message));
      }

      if (row.email && existingEmails.has(row.email)) {
          status = 'INVALID';
          errors.push(`Email ${row.email} sudah terdaftar di sistem`);
      }
      if (row.noWa && existingNoWas.has(row.noWa)) {
          status = 'INVALID';
          errors.push(`No HP ${row.noWa} sudah terdaftar di sistem`);
      }

      if (row.email) {
          if (excelEmails.has(row.email)) {
              status = 'INVALID';
              errors.push(`Email ${row.email} duplikat dalam file excel`);
          } else {
              excelEmails.add(row.email);
          }
      }

      if (row.noWa) {
          if (excelNoWas.has(row.noWa)) {
              status = 'INVALID';
              errors.push(`No HP ${row.noWa} duplikat dalam file excel`);
          } else {
              excelNoWas.add(row.noWa);
          }
      }

      if (status === 'VALID') validRowCount++;
      if (status === 'INVALID') invalidRowCount++;

      rowDetail.push({
          rowNumber: row._rowNumber,
          status,
          payload: row,
          errors
      });
  }

  rowDetail.sort((a, b) => a.rowNumber - b.rowNumber);

  return {
      totalRow,
      validRowCount,
      invalidRowCount,
      skippedRowCount,
      rowDetail
  };
};

export const commitImport = async (jadwalTrainingId: string, participants: any[]) => {
  if (!jadwalTrainingId) {
      throw new HttpError('jadwalTrainingId dibutuhkan', 400);
  }
  
  if (!participants || participants.length === 0) {
      throw new HttpError('Tidak ada data peserta valid untuk diimport', 400);
  }

  const emailsToCheck = participants.map(r => r.email).filter(Boolean) as string[];
  const noWasToCheck = participants.map(r => r.noWa).filter(Boolean) as string[];

  const existingUsers = await participantImportRepository.findDuplicateUsers(emailsToCheck, noWasToCheck);
  if (existingUsers.length > 0) {
      throw new HttpError('Terdapat email atau No. HP yang sudah terdaftar, harap lakukan preview ulang.', 400);
  }

  const result = await participantImportRepository.commitImport(jadwalTrainingId, participants);
  return result;
};
