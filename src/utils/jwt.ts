import jwt from "jsonwebtoken";
import { ITokenPayload } from "./interfaces";
import { JWT_SECRET } from "./env";

export const generateToken = (payload: ITokenPayload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export const verifyToken = (token: string): ITokenPayload => {
    return jwt.verify(token, JWT_SECRET) as ITokenPayload; // cast to ITokenPayload because verify returns type by default string | object so we need to cast it if no, we can't access the properties of the payload
}