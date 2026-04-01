import jwt from "jsonwebtoken";
import { ITokenPayload } from "./interfaces";
import { JWT_SECRET } from "./env";
import { SignOptions } from "jsonwebtoken";

export const TOKEN_EXPIRATION_TIME = {
  AUTH: "1d",
  RESET_PASSWORD: "1h",
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