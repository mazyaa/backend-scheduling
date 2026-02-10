import { Request, Response } from "express";
import * as notificationServices from "../services/notification";
export const sendNotification = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const waLinks = await notificationServices.sendNotificationForDetailSchedule(id);

    res.status(200).json({
        message: "Notification links generated successfully",
        data: waLinks,
    });
};