import * as trainingRepository from '../repositories/training';
import { HttpError } from '../utils/error';
import {
  ICreateTraining,
  IPaginationQuery,
  IResultPagination,
  ITraining,
} from '../utils/interfaces';

export const createTraining = async (payload: ICreateTraining): Promise<ITraining> => { 
  const { namaTraining } = payload;
  
  const existingTraining = await trainingRepository.getTrainingByName(namaTraining);

  if (existingTraining) {
    throw new HttpError('Training with the same name already exists!', 409);
  }
  
  const data = await trainingRepository.createTraining(payload);

  return data;
};

export const getTrainingById = async (id: string): Promise<ITraining | null> => {
  const data = await trainingRepository.getTrainingById(id);

  return data;
};

export const getAllTraining = async (
  payload: IPaginationQuery,
): Promise<{
  data: ITraining[];
  pagination: IResultPagination;
}> => {
  const { page, limit, search } = payload;

  const skip = (page - 1) * limit; // for skipping data ex: page 2 => (2-1)*10 = 10 data will be skipped

  const where = search
    ? {
        namaTraining: {
          contains: search,
          mode: 'insensitive',
        },
      }
    : undefined;

  const [data, total] = await Promise.all([
    // Promise.all to run multiple async task simultaneously
    // task 1: get all training with pagination
    trainingRepository.getAllTraining({
      skip,
      take: limit,
      where,
    }),

    // task 2: count total training
    trainingRepository.countTraining(where),
  ]);

  const totalPages = Math.ceil(total / limit); // use Math.ceil to round up the total pages ex: 95/10 = 9.5 => 10 pages

  return {
    data,
    pagination: {
      total, // total data
      totalPages,
      currentPage: page,
      limit,
      hasNext: page < totalPages, // if current page less than total pages, means has next page
      hasPrevious: page > 1, // if current page greater than 1, means has previous page
    },
  };
};

export const updateTraining = async (
  id: string,
  payload: ICreateTraining,
): Promise<ITraining> => {
  const { namaTraining, description } = payload;

  const training = await trainingRepository.getTrainingById(id);

  if (!training) {
    throw new HttpError('Training not found!', 404);
  }

  const updatedTrainingPayload: ICreateTraining = {
    namaTraining,
    description,
  };

  const data = await trainingRepository.updateTraining(
    id,
    updatedTrainingPayload,
  );

  return data;
};

export const deleteTraining = async (id: string): Promise<ITraining> => {
  const data = await trainingRepository.deleteTraining(id);

  return data;
};
