import { generateCredetialMessage } from "../utils/helper";
import * as instrukturOrAsesorRepository from "../repositories/instruturOrAsesor";
import * as detailScheduleRepository from "../repositories/detailSchedule";
import { HttpError } from "../utils/error";
import { IGenerateCredentialPayload, ICredential } from "../utils/interfaces";

export const generateCredentialMessages = async (payload: IGenerateCredentialPayload): Promise<ICredential> => {
    const { instrukturId, asesorId } = payload;

    const getInstruktur = await instrukturOrAsesorRepository.getInstrukturOrAsesorById(instrukturId ?? "");
    const getAsesor = await instrukturOrAsesorRepository.getInstrukturOrAsesorById(asesorId ?? "");

    const messageCredential = generateCredetialMessage({
        instrukturName: getInstruktur?.name,
        asesorName: getAsesor?.name,
        instrukturEmail: getInstruktur?.email,
        instrukturPassword: getInstruktur?.password,
        asesorEmail: getAsesor?.email,
        asesorPassword: getAsesor?.password,
        instrukturRole: getInstruktur?.role,
        asesorRole: getAsesor?.role
    });

    let generatedCredentialForInstruktur = "";
    let generatedCredentialForAsesor = "";

    if (getInstruktur && instrukturId) {
        generatedCredentialForInstruktur = `https://wa.me/${getInstruktur.noWa}?text=${encodeURIComponent(messageCredential.messageCredentialForInstruktur)}`;
    }

    if (getAsesor && asesorId) {
        generatedCredentialForAsesor = `https://wa.me/${getAsesor.noWa}?text=${encodeURIComponent(messageCredential.messageCredentialForAsesor)}`;
    }

    return { generatedCredentialForInstruktur, generatedCredentialForAsesor };
}

export const sendCredentialInstrukturOrAsesor = async (detailScheduleId: string): Promise<ICredential> => {
    const detail = await detailScheduleRepository.getDetailScheduleById(detailScheduleId);

    if (!detail) {
        throw new HttpError('Detail schedule not found', 404);
    }

    if (!detail.instrukturId && !detail.asesorId) {
        throw new HttpError('Instruktur or Asesor not assigned for this detail schedule', 400);
    }

    const generateCredential = await generateCredentialMessages({
        instrukturId: detail.instrukturId ?? undefined,
        asesorId: detail.asesorId ?? undefined,
    });

    return generateCredential;
}