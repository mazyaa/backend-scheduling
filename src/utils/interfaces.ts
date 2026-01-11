import type { RoleUser } from "@prisma/client";

export interface ICreateUser {
    name: string;
    email: string;
    noWa: string;
    role: RoleUser;
    password: string;
    keahlian?: string | null;
}

export interface IUser extends ICreateUser { // use Omit to exclude keahlian from IUser and recreate type keahlian to Ilogin
    id: string;
}

export interface ITokenPayload extends Pick<ICreateUser, "email"> { // use Pick to select only email from IUser so if have pick, not neet to rewrite type again
    id: string;
}

export interface Ilogin {
    name: string;
    role: string;
    token: string;
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

export interface IMetaPagination {
     total: number;
        totalPages: number;
        currentPage: number;
        limit: number;
        hasNext: boolean;
        hasPrevious: boolean;
}
