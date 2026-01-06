import { RoleUser } from '@prisma/client';

export interface IUser {
    name: string;
    email: string;
    noWa: string;
    role: RoleUser;
    password: string;
    keahlian?: string;
}

export interface ICreateUser extends Omit<IUser, "keahlian"> { // use Omit to exclude keahlian from IUser and recreate type keahlian to Ilogin
    id: string;
    keahlian?: string | null;
}

export interface ITokenPayload extends Pick<IUser, "email"> { // use Pick to select only email from IUser so if have pick, not neet to rewrite type again
    id: string;
}

export interface Ilogin {
    name: string;
    role: RoleUser;
    token: string;
}
