import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/error";
import { verifyTokenAndUser } from "../services/auth";
import { ICreateUser } from "../utils/interfaces";

export const isAuthorized = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authorization: string | undefined = req.get("Authorization");

    if (!authorization) {
        throw new HttpError("Unauthorized: No Authorization header provided", 401);
    }

    // destructure type and token from authorization header
    const [type, token] = authorization.split(" ");

    if (type.toLocaleLowerCase() !== "bearer" && token) {
        throw new HttpError("Unauthorized: Invalid Authorization header format", 401);
    }

    const user = await verifyTokenAndUser(token);

    res.locals.currentUserLogin = user as ICreateUser; // store user data in res.locals for access in next middleware or controller

    next(); // if everything is fine, pass control to next middleware or controller
}