import type { RoleUser, Aktivitas } from '@prisma/client';

export interface ICreateUser {
  name: string;
  image?: string | null;
  email: string;
  noWa: string;
  role: RoleUser;
  password?: string | null;
  keahlian?: string | null;
}

export interface IUserWithoutPassword extends Omit<ICreateUser, 'password'> {
  id: string;
}

export interface IUser extends ICreateUser {
  id: string;
  password?: string | null;
}

export interface ITokenPayload {
  userId: string;
  role?: RoleUser;
}

export interface IResultLogin {
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
  image: string | null;
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

export interface ISetPasswordPayload {
  token: string;
  userId: string;
  expiredAt: Date;
  isUsed: boolean;
}

export interface ISetPassword extends ISetPasswordPayload {
  id: string;
}

export interface ICredentialPayload {
  name: string;
  role: string;
  email: string;
  setPasswordLink: string;
}
