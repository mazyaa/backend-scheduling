import { ValidationError } from 'joi';
import { IMessageWhatsappPayload } from './interfaces';

export const generateJoiErrorMessage = (error: ValidationError): string => {
  const errorDetails = error.details.map((err: any) => err.message);
  return errorDetails.join(', '); // use commas to separate multiple error messages
};

export const generateRandomPassword = (length: number = 8): string => {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export const generateMessageWhatsapp = (payload: IMessageWhatsappPayload) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }; // e.g., 1 Januari 2024
  const formattedDate = payload.hari.toLocaleDateString('id-ID', dateOptions); // Format date to Indonesian locale

  const messageForInstruktur =
    `Yth. Bapak/Ibu. ${payload.instrukturName},\n\n` +
    `Dengan hormat, kami informasikan bahwa Anda telah ditunjuk sebagai instruktur/pengajar pada kegiatan berikut:\n\n` +
    `Hari/Tanggal : ${formattedDate}\n` +
    `Hari Ke      : ${payload.hariKe}\n` +
    `Skema        : ${payload.nameTraining}\n` +
    `Mohon konfirmasi kesediaan Anda. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.\n\n` +
    `Salam,\nAdmin PT. Veritrust Global Solusindo`;

  const messageForAsesor =
    `Yth. Bapak/Ibu. ${payload.asesorName},\n\n` +
    `Dengan hormat, kami informasikan bahwa Anda telah ditunjuk sebagai asesor pada kegiatan berikut:\n\n` +
    `Hari/Tanggal : ${formattedDate}\n` +
    `Hari Ke      : ${payload.hariKe}\n` +
    `Skema        : ${payload.nameTraining}\n` +
    `Mohon konfirmasi kesediaan Anda. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.\n\n` +
    `Salam,\nAdmin PT. Veritrust Global Solusindo`;

  return {
    messageForInstruktur,
    messageForAsesor,
  };
};
