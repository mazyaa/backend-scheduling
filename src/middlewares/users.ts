import { Request, Response, NextFunction } from "express";
import { ICreateUser, IUser } from "../utils/interfaces";
import { HttpError } from "../utils/error";
import * as authServices from "../services/auth";

export const checkUserIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const users = await authServices.getUserById(id);

    if (!users) {
        throw new HttpError("User not found", 404);
    }

    res.locals.users = users;

    next();
}

//ini dipakenya nanti pas update data user, ngambil dari data user yang udah login terus di compare sama email/noWa yang di update
export const checkUserEmailorNoWaExists = async (req: Request, res: Response, next: NextFunction) => {
    const { email, noWa } = req.body;

    const currentUser = res.locals.login as IUser; // get current user from res.locals
    
    const skipUniqueCheckEmail: boolean = currentUser?.email === email as string; // if true, skip email uniqueness check
   
    // if email provided and skipUniqueCheckEmail is false
    if (email && !skipUniqueCheckEmail) {
        const existingUserByEmail = await authServices.getUserByEmail(email);

        if (existingUserByEmail) {
            throw new HttpError("Email already in use", 409);
        }
    }

    const skipUniqueCheckNoWa = currentUser?.noWa === noWa; // if true, skip noWa uniqueness check

    // if noWa provided and skipUniqueCheckNoWa is false
    if (noWa && !skipUniqueCheckNoWa) {
        const existingUserByNoWa = await authServices.getUserByNumberWhatsapp(noWa);

        if (existingUserByNoWa) {
            throw new HttpError("No WhatsApp already in use", 409);
        }
    }

    next(); // if all checks pass, proceed to the next middleware or route handler
}

