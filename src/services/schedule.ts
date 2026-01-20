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

    // validate conflict schedule by date and batch so if there is already a schedule with the same date and batch, it will throw an error
    const checkConflict = await scheduleRepository.checkConflictSchedule(trainingId, batch);

    if (checkConflict) {
        throw new HttpError("Schedule with the same training and batch already exists", 409);
    }

    // main feature: generate detailJadwal based on startDate and duration
    const details = Array.from({ length: duration }).map((_, i) => { // use Array.from to create an array with length of duration ex: duration = 3 -> [undefined, undefined, undefined]
        const hari = new Date(startDate); // create new Date object by copying startDate
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

    return newSchedule;
}

export const getScheduleById = async (id: string) => {
    const schedule = await scheduleRepository.getScheduleById(id);

    return schedule;
}