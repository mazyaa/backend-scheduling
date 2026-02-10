import { IDetailSchedule, IPaginationQuery, IResultPagination } from "../utils/interfaces";
import { HttpError } from "../utils/error";
import * as detailScheduleRepository from "../repositories/detailSchedule";

export const createDetailSchedule = async (id: string, payload: IDetailSchedule, trainingId: string): Promise<IDetailSchedule> => {
    const { aktivitas, instrukturId, asesorId } = payload;

    const getDetailSchedule = await detailScheduleRepository.getDetailScheduleById(id);
    const getLastDay = await detailScheduleRepository.getMaxHariKe(trainingId); // last day of the training

   // for validating instructor and assessor assignment
   if (getLastDay !== null && getDetailSchedule !== null) { // validate if data exists
        if (getDetailSchedule.hariKe === getLastDay && instrukturId) { // last day can only have asesor
            throw new HttpError("Instructor can't be assigned on the last day, only assessor can be assigned", 400);
        } else if (getDetailSchedule.hariKe < getLastDay && asesorId) { // non last day can only have instruktur
            throw new HttpError("Assessor can only be assigned on the last day, only instructor can be assigned", 400);
        }
   } else {
        throw new HttpError("Detail Schedule or Training not found", 404);
   }

    const data = await detailScheduleRepository.createDetailSchedule(id, {
        aktivitas,
        instrukturId,
        asesorId,
    });

    return data;
}

export const getDetailScheduleById = async (id: string): Promise<IDetailSchedule | null> => {
    const data = await detailScheduleRepository.getDetailScheduleById(id);

    return data;
}

export const getAllDetailSchedules = async (
    payload: IPaginationQuery,
): Promise<{
    data: IDetailSchedule[];
    pagination: IResultPagination;
}> => {
    const { page, limit, search } = payload;

    const skip = (page - 1) * limit;

    const where = search
        ? {
            jadwalTraining: {
                training: {
                    namaTraining: {
                        contains: search,
                        mode: 'insensitive',
                    }
                }
            }
        }: undefined;

    const [data, total] = await Promise.all([
        detailScheduleRepository.getAllDetailSchedules({
            skip,
            take: limit,
            where,
            orderBy: { createdAt: 'desc' },
        }),

        detailScheduleRepository.countDetailSchedule(where),
    ]);

    const totalPages = Math.ceil(total / limit); 

    return {
        data,
        pagination: {
            total,
            totalPages,
            currentPage: page,
            limit,
            hasNext: page < totalPages, // if not last page, true
            hasPrevious: page > 1, // if not first page, true
        },
    }
}

export const updateDetailScheduleById = async (id: string, payload: IDetailSchedule, trainingId: string): Promise<IDetailSchedule> => {
    const { aktivitas, instrukturId, asesorId } = payload;  

    const getDetailSchedule = await detailScheduleRepository.getDetailScheduleById(id);
    const getLastDay = await detailScheduleRepository.getMaxHariKe(trainingId);

    if (getLastDay !== null && getDetailSchedule !== null) { // validate if data exists
        if (getDetailSchedule.hariKe === getLastDay && instrukturId) { // last day can only have asesor
            throw new HttpError("Instructor can't be assigned on the last day, only assessor can be assigned", 400);
        } else if (getDetailSchedule.hariKe < getLastDay && asesorId) { // non last day can only have instruktur
            throw new HttpError("Assessor can only be assigned on the last day, only instructor can be assigned", 400);
        }
   } else {
        throw new HttpError("Detail Schedule or Training not found", 404);
   }

    const data = await detailScheduleRepository.updateDetailScheduleById(id, {
        aktivitas,
        instrukturId,
        asesorId,
    });

    return data;
}
