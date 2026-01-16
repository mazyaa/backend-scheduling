import { ICreateSchedule } from "../utils/interfaces";
import * as scheduleRepository from "../repositories/schedule";
import * as trainingRepository from "../repositories/training";
import { HttpError } from "../utils/error";

export const createSchedule = async (payload: ICreateSchedule) => {
    const { trainingId, startDate, duration, batch } = payload;

    const training = await trainingRepository.getTrainingById(trainingId);

    if (!training) {
        throw new HttpError("Training not found", 404);
    }

    const checkConflict = await scheduleRepository.checkConflictSchedule(startDate, batch);

    if (checkConflict) {
        throw new HttpError("Schedule conflict detected for the given date and batch", 409);
    }

    // main feature: generate detailJadwal based on startDate and duration
    const details = Array.from({ length: duration }).map((_, i) => { // use Array.from to create an array with length of duration ex: duration = 3 -> [undefined, undefined, undefined]
        const hari = new Date(startDate); // create new Date object based on startDate
        hari.setDate(hari.getDate() + i); // add days by duration index

        return {
            hari,
            hariKe: i + 1,
        };
    });

    const newSchedule = await scheduleRepository.createSchedule({
        ...payload,
        detailJadwal: details,
    });
}