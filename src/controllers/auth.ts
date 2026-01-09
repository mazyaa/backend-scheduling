import { Request, Response } from "express";
import * as authServices from "../services/auth";

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const result = await authServices.login(email, password);

    res.status(200).json({
        message: "Login successful",
        data: result,
    });
}