import {
  ICreateSessionDetailSchedule,
  IPaginationQuery,
  IResultPagination,
  ISessionDetailSchedule,
} from '../utils/interfaces';
import {
  EXAM_DAY_TEMPLATE,
  REGULAR_DAY_TEMPLATE,
  SessionTemplate,
} from '../utils/sessionSchedule';
import { HttpError } from '../utils/error';
import * as sessionDetailScheduleRepository from '../repositories/sessionDetailSchedule';
import * as detailScheduleRepository from '../repositories/detailSchedule';
import { toMinutes, toTimeDate, toTimeString } from '../utils/helper';

export const generateSessionDetaiSchedules = async (
  detailScheduleId: string,
): Promise<ICreateSessionDetailSchedule[]> => {
  const getDetailScheduleById =
    await detailScheduleRepository.getDetailScheduleById(detailScheduleId);

  if (!getDetailScheduleById) {
    throw new HttpError('Detail schedule not found', 404);
  }

  const getMaxHariKe = await detailScheduleRepository.getMaxHariKe(
    getDetailScheduleById.id,
  );

  const sessions: SessionTemplate[] = [];

  if (!getMaxHariKe) {
    sessions.push(...REGULAR_DAY_TEMPLATE);
  } else {
    sessions.push(...EXAM_DAY_TEMPLATE);
  }

  if (!sessions.length) return [];

  const checkIfDetailSessionExistsByTime =
    await sessionDetailScheduleRepository.existingSessionDetailSchedule(
      detailScheduleId,
      toTimeDate(sessions[0].jamMulai) as unknown as string,
      toTimeDate(sessions[0].jamSelesai) as unknown as string,
    );

  if (checkIfDetailSessionExistsByTime?.detailJadwalTrainingId === getDetailScheduleById.id) {
    throw new HttpError(
      `Detail session on day ${getDetailScheduleById.hariKe} has been created`,
      400,
    );
  }

  if (!getDetailScheduleById.instrukturId && !getDetailScheduleById.asesorId) {
    throw new HttpError(
      'Instruktur or Asesor not assigned for this detail schedule',
      400,
    );
  }


  const payloads = sessions.map((session) => ({
    detailJadwalTrainingId: getDetailScheduleById.id,
    jamMulai: toTimeDate(session.jamMulai),
    jamSelesai: toTimeDate(session.jamSelesai),
    aktivitas: session.aktivitas,
    pic: session.pic,
  }));

  await sessionDetailScheduleRepository.createManySessionDetailSchedule(payloads);

  return payloads.map((item) => ({
    ...item,
    jamMulai: toTimeString(item.jamMulai),
    jamSelesai: toTimeString(item.jamSelesai),
  })) as ICreateSessionDetailSchedule[];
};

export const createSessionDetailSchedule = async (
  payload: ICreateSessionDetailSchedule,
): Promise<ISessionDetailSchedule> => {
  const { detailJadwalTrainingId, jamMulai, jamSelesai } = payload;

  const getDetailScheduleById =
    await detailScheduleRepository.getDetailScheduleById(
      detailJadwalTrainingId,
    );

  if (!getDetailScheduleById) {
    throw new HttpError('Detail schedule not found', 404);
  }

  const checkIfDetailSessionExistsByTime =
    await sessionDetailScheduleRepository.existingSessionDetailSchedule(
      detailJadwalTrainingId,
      toTimeDate(jamMulai) as unknown as string,
      toTimeDate(jamSelesai) as unknown as string,
    );

   if (checkIfDetailSessionExistsByTime?.detailJadwalTrainingId === getDetailScheduleById.id) {
    throw new HttpError(
      `Detail session on time ${jamMulai} - ${jamSelesai} has been created`,
      400,
    );
  }

  if (!getDetailScheduleById.instrukturId && !getDetailScheduleById.asesorId) {
    throw new HttpError(
      'Instruktur or Asesor not assigned for this detail schedule',
      400,
    );
  }

  if (toMinutes(payload.jamSelesai) <= toMinutes(payload.jamMulai)) {
    throw new HttpError('Jam selesai harus lebih besar dari jam mulai', 400);
  }

  const result =
    await sessionDetailScheduleRepository.createSessionDetailSchedule({
      ...payload,
      jamMulai: toTimeDate(payload.jamMulai),
      jamSelesai: toTimeDate(payload.jamSelesai),
    });

  return {
    ...result,
    jamMulai: toTimeString(result.jamMulai),
    jamSelesai: toTimeString(result.jamSelesai),
  };
};

export const getSessionDetailScheduleById = async (id: string) => {
  const result =
    await sessionDetailScheduleRepository.getSessionDetailSchedule(id);

  if (!result) {
    throw new HttpError('Session detail schedule not found', 404);
  }
  return {
    ...result,
    jamMulai: toTimeString(result.jamMulai),
    jamSelesai: toTimeString(result.jamSelesai),
  };
};

export const updateSessionDetailSchedule = async (
  id: string,
  payload: Partial<ISessionDetailSchedule>,
) => {
  const result =
    await sessionDetailScheduleRepository.updateSessionDetailSchedule(
      id,
      payload,
    );

  if (!result) {
    throw new HttpError('Session detail schedule not found', 404);
  }

  return {
    ...result,
    jamMulai: toTimeString(result.jamMulai),
    jamSelesai: toTimeString(result.jamSelesai),
  };
};

export const deleteSessionDetailSchedule = async (id: string) => {
  const result =
    await sessionDetailScheduleRepository.deleteSessionDetailSchedule(id);

  if (!result) {
    throw new HttpError('Session detail schedule not found', 404);
  }

  return {
    ...result,
    jamMulai: toTimeString(result.jamMulai),
    jamSelesai: toTimeString(result.jamSelesai),
  };
};

export const getAllSessionDetailSchedule = async (
  payload: IPaginationQuery,
): Promise<{
  data: ISessionDetailSchedule[];
  pagination: IResultPagination;
}> => {
  const { page, limit, search, filter } = payload;

  const skip = (page - 1) * limit;

  const where: any = {};

  if (filter) {
    where.detailJadwalTrainingId = filter;
  }

  if (search?.trim()) {
    where.aktivitas = {
      contains: search.trim(),
      mode: 'insensitive',
    };
  }

  const [data, total] = await Promise.all([
    sessionDetailScheduleRepository.getSessionDetailSchedules({
      skip,
      take: limit,
      where,
      orderBy: [{ jamMulai: 'asc' }, { jamSelesai: 'asc' }],
    }),
    sessionDetailScheduleRepository.countSessionDetailSchedule(where),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: data.map((item) => ({
      ...item,
      jamMulai: toTimeString(item.jamMulai),
      jamSelesai: toTimeString(item.jamSelesai),
    })),
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
