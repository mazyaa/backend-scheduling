import { NextFunction, Request, Response } from "express";
import { IUser } from "../utils/interfaces";
import * as authServices from "../services/auth";
import { HttpError } from "../utils/error";

export const checkInstrukturOrAsesorEmailAndNoWaExist = async (req: Request, res: Response, next: NextFunction) => {
    const { email, noWa } = req.body;
    const existingInstrukturOrAsesor = res.locals.users as IUser;

    const skipUniqueCheckEmail: boolean = existingInstrukturOrAsesor?.email === email as string; // if true, skip email uniqueness check
    
    if (email && !skipUniqueCheckEmail) {
        const existingUserByEmail = await authServices.getUserByEmail(email);

        if (existingUserByEmail) {
            throw new HttpError("Email already in use", 409);
        }
    }

    const skipUniqueCheckNoWa = existingInstrukturOrAsesor?.noWa === noWa; // if true, skip noWa uniqueness check

    if (noWa && !skipUniqueCheckNoWa) {
        const existingUserByNoWa = await authServices.getUserByNumberWhatsapp(noWa);
        
        if (existingUserByNoWa) {
            throw new HttpError("No WhatsApp already in use", 409);
        }
    }

    next(); 
}