import {
  ICreateAssesment,
  IAssesment,
  IPaginationQuery,
  IResultPagination,
} from '../utils/interfaces';
import { HttpError } from '../utils/error';
import * as assesmentRepository from '../repositories/assesment';
import * as scheduleRepository from '../repositories/schedule';
import * as userRepository from '../repositories/user';

export const createAssesment = async (
  payload: ICreateAssesment,
): Promise<IAssesment> => {
  const { userId, jadwalTrainingId } = payload;

  const user = await userRepository.getUserById(userId);
  
  if (!user) {
    throw new HttpError('User not found', 404);
  }
  
  const checkUserInSchedule = await userRepository.getUserIfExistsInSchedule(
    userId,
    jadwalTrainingId,
  );
  
  if (!checkUserInSchedule) {
    throw new HttpError('User is not a participant of the specified training schedule', 400);
  }

  const jadwalTraining = await scheduleRepository.getScheduleById(jadwalTrainingId);

  if (!jadwalTraining) {
    throw new HttpError('Training schedule not found', 404);
  }

  const existing = await assesmentRepository.getAssesmentByUserAndJadwal(
    userId,
    jadwalTrainingId,
  );

  if (existing) {
    throw new HttpError(
      'Penilaian for this user on this training schedule already exists',
      409,
    );
  }

  const data = await assesmentRepository.createAssesment(payload);

  return data;
};

export const getAssesmentById = async (id: string) => {
  const data = await assesmentRepository.getAssesmentById(id);

  return data;
};

export const updateAssesment = async (
  id: string,
  payload: Partial<ICreateAssesment>,
): Promise<IAssesment> => {
  if (payload.userId) {
    const user = await userRepository.getUserById(payload.userId);

    if (!user) {
      throw new HttpError('User not found', 404);
    }
  }

  if (payload.jadwalTrainingId) {
    const jadwalTraining = await scheduleRepository.getScheduleById(
      payload.jadwalTrainingId,
    );

    if (!jadwalTraining) {
      throw new HttpError('Training schedule not found', 404);
    }
  }

  const data = await assesmentRepository.updateAssesment(id, payload);

  return data;
};

export const deleteAssesment = async (id: string): Promise<IAssesment> => {
  const data = await assesmentRepository.deleteAssesment(id);

  return data;
};

export const getAllAssesment = async (
  payload: IPaginationQuery,
): Promise<{
  data: IAssesment[];
  pagination: IResultPagination;
}> => {
  const { page, limit, search, filter } = payload;

  const skip = (page - 1) * limit;

  const where: any = {};

  if (filter) {
    where.jadwalTrainingId = filter;
  }

  if (search?.trim()) {
    where.catatan = {
      contains: search.trim(),
      mode: 'insensitive',
    };
  }

  const [data, total] = await Promise.all([
    assesmentRepository.getAllAssesment({
      skip,
      take: limit,
      where,
      orderBy: { createdAt: 'desc' },
    }),
    assesmentRepository.countAssesment(where),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      limit,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  };
};
