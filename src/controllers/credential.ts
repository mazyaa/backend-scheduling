import * as credentialServices from "../services/credential";
import { Request, Response } from "express";

export const sendCredential = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const link = await credentialServices.sendSetPasswordLink(id);

    res.status(201).json({
        message: "Link created successfully!",
        data: link,
    });
};