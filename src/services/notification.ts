import { generateMessageWhatsapp } from "../utils/helper";
import * as instrukturOrAsesorRepository from "../repositories/instruturOrAsesor";
import * as detailScheduleRepository from "../repositories/detailSchedule";
import { HttpError } from "../utils/error";
import { IGenerateWaLinksPayload, IWaLinks } from "../utils/interfaces";

export const generateWaLinks = async (payload: IGenerateWaLinksPayload): Promise<IWaLinks> => {
    const { instrukturId, asesorId, hari, hariKe, nameTraining } = payload;

    const getInstruktur = await instrukturOrAsesorRepository.getInstrukturOrAsesorById(instrukturId ?? "");
    const getAsesor = await instrukturOrAsesorRepository.getInstrukturOrAsesorById(asesorId ?? "");

    const pesan = generateMessageWhatsapp({
        hari,
        hariKe,
        nameTraining,
        instrukturName: getInstruktur?.name,
        insturkturNoWa: getInstruktur?.noWa,
        asesorName: getAsesor?.name,
        asesorNoWa: getAsesor?.noWa,
    });

    let waLinkInstruktur = "";
    let waLinkAsesor = "";

    if (getInstruktur && instrukturId) {
        waLinkInstruktur = `https://wa.me/${getInstruktur.noWa}?text=${encodeURIComponent(pesan.messageForInstruktur)}`;
    }

    if (getAsesor && asesorId) {
        waLinkAsesor = `https://wa.me/${getAsesor.noWa}?text=${encodeURIComponent(pesan.messageForAsesor)}`;
    }

    return { waLinkInstruktur, waLinkAsesor };
};

export const sendNotificationForDetailSchedule = async (detailScheduleId: string): Promise<IWaLinks> => {
    const detail = await detailScheduleRepository.getDetailScheduleById(detailScheduleId);

    if (!detail) {
        throw new HttpError('Detail schedule not found', 404);
    }

    if (!detail.instrukturId && !detail.asesorId) {
        throw new HttpError('Instruktur or Asesor not assigned for this detail schedule', 400);
    }

    const nameTraining = detail.jadwalTraining?.training?.namaTraining || ""; // get training name

    const waLinks = await generateWaLinks({
        instrukturId: detail.instrukturId ?? undefined,
        asesorId: detail.asesorId ?? undefined,
        hari: detail.hari,
        hariKe: detail.hariKe,
        nameTraining,
    });

    return waLinks;
};
