import { Request, Response } from "express";
import * as setPasswordServices from "../services/setPassword";
import { ISetPasswordPayload } from "../utils/interfaces";

export const setPassword = async (req: Request, res: Response): Promise<void> => {
    const { token, password } = req.body as ISetPasswordPayload;

    await setPasswordServices.setPassword(token, password);

    res.status(200).json({
        message: "Password reset successfully!",
    });
}