import jwt from "jsonwebtoken";
import { ITokenPayload } from "./interfaces";
import { JWT_SECRET } from "./env";
import { SignOptions } from "jsonwebtoken";
import crtypto from "crypto";

export const TOKEN_EXPIRATION_TIME = {
  AUTH: "1d",
  SET_PASSWORD: "1h",
} as const;

export const generateToken = (
  payload: ITokenPayload,
  expiresIn:  SignOptions["expiresIn"]
): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string): ITokenPayload => {
    return jwt.verify(token, JWT_SECRET) as ITokenPayload; // cast to ITokenPayload because verify returns type by default string | object so we need to cast it if no, we can't access the properties of the payload
}

export const hashToken = (token: string) => {
  return crtypto.createHash("sha256").update(token).digest("hex");
}

export const generateExpiry = (minutes: number) => {
  return new Date(Date.now() + minutes * 60 * 1000);
}