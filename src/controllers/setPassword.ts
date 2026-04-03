import { Request, Response } from "express";
import * as setPasswordServices from "../services/setPassword";

export const setPassword = async (req: Request, res: Response): Promise<void> => {
    const { token, newPassword } = req.body;

    await setPasswordServices.setPassword(token, newPassword);

    res.status(200).json({
        message: "Password reset successful",
    });
}