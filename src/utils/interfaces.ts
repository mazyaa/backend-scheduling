import type { RoleUser, Aktivitas } from '@prisma/client';

export interface ICreateUser {
  name: string;
  email: string;
  noWa: string;
  role: RoleUser;
  password: string;
  keahlian?: string | null;
}

export interface IUser extends ICreateUser {
  // use Omit to exclude keahlian from IUser and recreate type keahlian to Ilogin
  id: string;
}

export interface ITokenPayload extends Pick<ICreateUser, 'email'> {
  // use Pick to select only email from IUser so if have pick, not neet to rewrite type again
  id: string;
}

export interface IToken {
  name: string;
  role: string;
  token: string;
}

export interface Ilogin {
  email: string;
  password: string;
}

export interface IPagination {
  skip: number;
  take: number;
  where?: any;
  orderBy?: any;
}

export interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
}

export interface IResultPagination {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ICreateTraining {
  namaTraining: string;
  description: string | null;
}

export interface ITraining extends ICreateTraining {
  id: string;
}

export interface ICreateDetailSchedule {
  hari: Date;
  hariKe: number;
  aktivitas?: Aktivitas | null;
  instrukturId?: string | null;
  asesorId?: string | null;
} 

export interface ICreateSchedule {
  trainingId: string;
  startDate: Date;
  duration: number;
  meetingLink: string;
  batch: string;
  detailJadwal?: Omit<ICreateDetailSchedule, 'aktivitas' | 'instrukturId' | 'asesorId'>[];
}

export interface ISchedules extends ICreateSchedule {
  id: string;
}

export interface IDetailSchedule extends ICreateDetailSchedule {
  id: string;
}

export interface IGenerateNotificationPayload {
    instrukturId?: string | null;
    asesorId?: string | null;
    hari: Date;
    hariKe: number;
    nameTraining: string;
}

export interface IGenerateCredentialPayload {
    instrukturId?: string | null;
    asesorId?: string | null;
}

export interface INotification {
    generatedNotificationForInstruktur: string;
    generatedNotificationForAsesor: string;
}

export interface ICredential {
    generatedCredentialForInstruktur: string;
    generatedCredentialForAsesor: string;
}

export interface INotificationPayload { // for util/helper.ts
  hari: Date;
  hariKe: number;
  nameTraining?: string | null;
  instrukturName?: string | null;
  insturkturNoWa?: string | null;
  asesorName?: string | null;
  asesorNoWa?: string | null;
  instrukutrEmail?: string | null;
}

export interface ICredentialPayload extends Omit<INotificationPayload, 'hari'| 'hariKe'> { // for util/helper.ts
  instrukturEmail?: string | null;
  instrukturPassword?: string | null;
  asesorEmail?: string | null;
  asesorPassword?: string | null;
  instrukturRole?: string | null;
  asesorRole?: string | null;
}
