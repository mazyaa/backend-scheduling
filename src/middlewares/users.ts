import { Request, Response, NextFunction } from "express";
import { ICreateUser } from "../utils/interfaces";
import { HttpError } from "../utils/error";
import * as authServices from "../services/auth";

export const checkUserIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const user = await authServices.getUserById(id);

    if (!user) {
        throw new HttpError("User not found", 404);
    }

    next();
}

export const checkUserEmailorNoWaExists = async (req: Request, res: Response, next: NextFunction) => {
    const { email, noWa } = req.body;

    const currentUser = res.locals.user as ICreateUser; // get current user from res.locals

    const skipUniqueCheckEmail: boolean = currentUser?.email === email as string; // if true, skip email uniqueness check
   
    // check if email already exists in the database
    if (email && !skipUniqueCheckEmail) {
        const existingUserByEmail = await authServices.getUserByEmail(email);

        if (existingUserByEmail) {
            throw new HttpError("Email already in use", 409);
        }
    }

    const skipUniqueCheckNoWa = currentUser?.noWa === noWa; // if true, skip noWa uniqueness check

    // check if noWa already exists in the database
    if (noWa && !skipUniqueCheckNoWa) {
        const existingUserByNoWa = await authServices.getUserByNumberWhatsapp(noWa);

        if (existingUserByNoWa) {
            throw new HttpError("No WhatsApp already in use", 409);
        }
    }

    next(); // if all checks pass, proceed to the next middleware or route handler
}

