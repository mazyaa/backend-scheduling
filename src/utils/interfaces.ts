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
  aktivitas?: Aktivitas;
}

export interface ICreateSchedule {
  trainingId: string;
  startDate: Date;
  duration: number;
  meetingLink: string;
  batch: string;
  detailJadwal?: Omit<ICreateDetailSchedule, 'aktivitas'>[];
}

export interface ISchedules extends ICreateSchedule {
  id: string;
}
