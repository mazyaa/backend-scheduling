import * as credentialServices from "../services/credential";
import { Request, Response } from "express";

export const sendCredentialInstrukturOrAsesor = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const credentialMessage = await credentialServices.sendCredentialInstrukturOrAsesor(id);

    res.status(200).json({
        message: "Credential messages generated successfully",
        data: credentialMessage,
    });
};