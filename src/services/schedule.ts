import {
  ICreateSchedule,
  IPaginationQuery,
  IResultPagination,
  ISchedules,
  ITraining,
} from '../utils/interfaces';
import * as scheduleRepository from '../repositories/schedule';
import * as trainingRepository from '../repositories/training';
import { HttpError } from '../utils/error';

export const createSchedule = async (payload: ICreateSchedule) => {
  const { trainingId, startDate, duration, batch } = payload;

  const training = await trainingRepository.getTrainingById(trainingId);

  if (!training) {
    throw new HttpError('Training not found', 404);
  }

  // validate conflict schedule by date and batch so if there is already a schedule with the same date and batch, it will throw an error
  const checkConflict = await scheduleRepository.checkConflictSchedule(
    trainingId,
    batch,
  );

  if (checkConflict) {
    throw new HttpError(
      'Schedule with the same training and batch already exists',
      409,
    );
  }

  // main feature: generate detailJadwal based on startDate and duration
  const details = Array.from({ length: duration }).map((_, i) => {
    // use Array.from to create an array with length of duration ex: duration = 3 -> [undefined, undefined, undefined]
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
};

export const getScheduleById = async (id: string) => {
  const schedule = await scheduleRepository.getScheduleById(id);

  return schedule;
};

export const getAllSchedules = async (
  payload: IPaginationQuery,
): Promise<{
  data: ISchedules[];
  pagination: IResultPagination;
}> => {
  const { page, limit, search } = payload;

  const skip = (page - 1) * limit; //skipping data

  const where = search
    ? {
        training: { // relation to training table
            namaTraining: {
                contains: search,
                mode: 'insensitive',
            },
        }
      }
    : undefined;

  const [data, total] = await Promise.all([
    scheduleRepository.getAllSchedules({
      skip,
      take: limit,
      where,
      orderBy: { createdAt: 'desc' },
    }),

    scheduleRepository.countSchedule(where),
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
  };
};

export const updateSchedule = async (
  id: string,
  payload: Partial<Omit<ICreateSchedule, 'detailJadwal'>>,
) => {
  const { trainingId, batch, startDate, duration } = payload;

  if (startDate || duration) {
    throw new HttpError('Cannot update field startDate or duration', 400);
  }

  const checkConflict = await scheduleRepository.checkConflictSchedule(
    trainingId!,
    batch!,
  );

  if (checkConflict) {
    throw new HttpError(
      'Schedule with the same training and batch already exists',
      409,
    );
  }

  const data = await scheduleRepository.updateSchedule(id, payload);

  return data;
};

export const deleteSchedule = async (id: string) => {
  const deletedSchedule = await scheduleRepository.deleteSchedule(id);

  return deletedSchedule;
};
