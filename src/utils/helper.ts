import { ValidationError } from 'joi';
import { ICredentialPayload, INotificationPayload } from './interfaces';

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

export const generateNotificationMessage = (payload: INotificationPayload) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }; // e.g., 1 Januari 2024
  const formattedDate = payload.hari.toLocaleDateString('id-ID', dateOptions); // Format date to Indonesian locale

  const notificationForInstruktur =
    `Yth. Bapak/Ibu. ${payload.instrukturName},\n\n` +
    `Dengan hormat, kami informasikan bahwa Anda telah ditunjuk sebagai instruktur/pengajar pada kegiatan berikut:\n\n` +
    `Hari/Tanggal : ${formattedDate}\n` +
    `Hari Ke      : ${payload.hariKe}\n` +
    `Skema        : ${payload.nameTraining}\n` +
    `Mohon konfirmasi kesediaan Anda. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.\n\n` +
    `Salam,\nAdmin PT. Veritrust Global Solusindo`;

  const notificationForAsesor =
    `Yth. Bapak/Ibu. ${payload.asesorName},\n\n` +
    `Dengan hormat, kami informasikan bahwa Anda telah ditunjuk sebagai asesor pada kegiatan berikut:\n\n` +
    `Hari/Tanggal : ${formattedDate}\n` +
    `Hari Ke      : ${payload.hariKe}\n` +
    `Skema        : ${payload.nameTraining}\n` +
    `Mohon konfirmasi kesediaan Anda. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.\n\n` +
    `Salam,\nAdmin PT. Veritrust Global Solusindo`;

  return {
    notificationForInstruktur,
    notificationForAsesor,
  };
};

export const generateCredetialMessage = (payload: ICredentialPayload) => {
  const messageCredentialForInstruktur =
    `Yth. Bapak/Ibu. ${payload.instrukturName},\n\n` +
    `Dikarenakan Bapak/Ibu bersedia untuk menjadi ${payload.instrukturRole} pada kegiatan kami, berikut adalah kredensial akun Bapak/Ibu:\n\n` +
    `Email    : ${payload.instrukutrEmail}\n` +
    `Password : ${payload.instrukturPassword}\n\n` +
    `Silakan login dan segera ganti kata sandi Bapak/Ibu di halaman profil demi keamanan akun.\n\n` +
    `Salam,\nAdmin PT. Veritrust Global Solusindo`;

  const messageCredentialForAsesor =
    `Yth. Bapak/Ibu. ${payload.asesorName},\n\n` +
    `Dikarenakan Bapak/Ibu bersedia untuk menjadi ${payload.asesorRole} pada kegiatan kami, berikut adalah kredensial akun Bapak/Ibu:\n\n` +
    `Email    : ${payload.asesorEmail}\n` +
    `Password : ${payload.asesorPassword}\n\n` +
    `Silakan login dan segera ganti kata sandi Bapak/Ibu di halaman profil demi keamanan akun.\n\n` +
    `Salam,\nAdmin PT. Veritrust Global Solusindo`;

  return {
    messageCredentialForInstruktur,
    messageCredentialForAsesor,
  };
};
