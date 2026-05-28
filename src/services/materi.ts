import {
  ICreateMateri,
  IMateri,
  IPaginationQuery,
  IResultPagination,
} from '../utils/interfaces';
import { HttpError } from '../utils/error';
import * as materiRepository from '../repositories/materi';
import * as detailScheduleRepository from '../repositories/detailSchedule';
import * as userRepository from '../repositories/user';

export const createMateri = async (
  payload: ICreateMateri,
): Promise<IMateri> => {
  const { detailJadwalTrainingId, diuploadOleh } = payload;

  const detailSchedule =
    await detailScheduleRepository.getDetailScheduleById(detailJadwalTrainingId);

  if (!detailSchedule) {
    throw new HttpError('Detail schedule not found', 404);
  }

  const uploader = await userRepository.getUserById(diuploadOleh);

  if (!uploader) {
    throw new HttpError('Uploader not found', 404);
  }

  const data = await materiRepository.createMateri(payload);

  return data;
};

export const getMateriById = async (id: string) => {
  const data = await materiRepository.getMateriById(id);

  return data;
};

export const updateMateri = async (
  id: string,
  payload: Partial<ICreateMateri>,
): Promise<IMateri> => {
  if (payload.detailJadwalTrainingId) {
    const detailSchedule = await detailScheduleRepository.getDetailScheduleById(
      payload.detailJadwalTrainingId,
    );

    if (!detailSchedule) {
      throw new HttpError('Detail schedule not found', 404);
    }
  }

  const data = await materiRepository.updateMateri(id, payload);

  return data;
};

export const deleteMateri = async (id: string): Promise<IMateri> => {
  const data = await materiRepository.deleteMateri(id);

  return data;
};

export const getAllMateri = async (
  payload: IPaginationQuery,
): Promise<{
  data: IMateri[];
  pagination: IResultPagination;
}> => {
  const { page, limit, search, filter } = payload;

  const skip = (page - 1) * limit;

  const where: any = {};

  if (filter) {
    where.detailJadwalTrainingId = filter;
  }

  if (search?.trim()) {
    where.judul = {
      contains: search.trim(),
      mode: 'insensitive',
    };
  }

  const [data, total] = await Promise.all([
    materiRepository.getAllMateri({
      skip,
      take: limit,
      where,
      orderBy: { createdAt: 'desc' },
    }),
    materiRepository.countMateri(where),
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
