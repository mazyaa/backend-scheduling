import { Request, Response } from "express";
import * as authServices from "../services/auth";
import { Ilogin, IUser } from "../utils/interfaces";

export const login = async (req: Request, res: Response): Promise<void> => {
    const payload = req.body as Ilogin;

    const result = await authServices.login(payload);

    res.status(200).json({
        message: "Login successful",
        data: result,
    });
};

export const getUserInfo = async (_req: Request, res: Response): Promise<void> => {
    const data: IUser = res.locals.currentUserLogin;

    const { password, ...result } = data;

    res.status(200).json({
        message: "User info retrieved successfully",
        data: result,   
    });

};