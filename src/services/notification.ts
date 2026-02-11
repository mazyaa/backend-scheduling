import { generateNotificationMessage } from "../utils/helper";
import * as instrukturOrAsesorRepository from "../repositories/instruturOrAsesor";
import * as detailScheduleRepository from "../repositories/detailSchedule";
import { HttpError } from "../utils/error";
import { IGenerateNotificationPayload, INotification } from "../utils/interfaces";

export const generateNotification = async (payload: IGenerateNotificationPayload): Promise<INotification> => {
    const { instrukturId, asesorId, hari, hariKe, nameTraining } = payload;

    const getInstruktur = await instrukturOrAsesorRepository.getInstrukturOrAsesorById(instrukturId ?? "");
    const getAsesor = await instrukturOrAsesorRepository.getInstrukturOrAsesorById(asesorId ?? "");

    const pesan = generateNotificationMessage({
        hari,
        hariKe,
        nameTraining,
        instrukturName: getInstruktur?.name,
        insturkturNoWa: getInstruktur?.noWa,
        asesorName: getAsesor?.name,
        asesorNoWa: getAsesor?.noWa,
    });

    let generatedNotificationForInstruktur = "";
    let generatedNotificationForAsesor = "";

    if (getInstruktur && instrukturId) {
        generatedNotificationForInstruktur = `https://wa.me/${getInstruktur.noWa}?text=${encodeURIComponent(pesan.notificationForInstruktur)}`;
    }

    if (getAsesor && asesorId) {
        generatedNotificationForAsesor = `https://wa.me/${getAsesor.noWa}?text=${encodeURIComponent(pesan.notificationForAsesor)}`;
    }

    return { generatedNotificationForInstruktur, generatedNotificationForAsesor };
};

export const sendNotificationForDetailSchedule = async (detailScheduleId: string): Promise<INotification> => {
    const detail = await detailScheduleRepository.getDetailScheduleById(detailScheduleId);

    if (!detail) {
        throw new HttpError('Detail schedule not found', 404);
    }

    if (!detail.instrukturId && !detail.asesorId) {
        throw new HttpError('Instruktur or Asesor not assigned for this detail schedule', 400);
    }

    const nameTraining = detail.jadwalTraining?.training?.namaTraining || ""; // get training name

    const waLinks = await generateNotification({
        instrukturId: detail.instrukturId ?? undefined,
        asesorId: detail.asesorId ?? undefined,
        hari: detail.hari,
        hariKe: detail.hariKe,
        nameTraining,
    });

    return waLinks;
};
