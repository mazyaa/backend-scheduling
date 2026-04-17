import { ICreateSessionDetailTraining, IDetailSchedule, IPaginationQuery, IResultPagination, ISessionDetailTraining } from "../utils/interfaces"
import { SESSION_TEMPLATE_BY_DAY } from "../utils/sessionSchedule"
import * as sessionDetailSchedule from "../repositories/sessionDetailSchedule"
import { HttpError } from "../utils/error";

export const generateSessionDetaiSchedule = async (detailJadwalTraining: IDetailSchedule): Promise<ISessionDetailTraining[]> => {
  const sessions = SESSION_TEMPLATE_BY_DAY[detailJadwalTraining.hariKe] || [];

  if (!sessions.length) return [];

  return await Promise.all(
    sessions.map((session) =>
      sessionDetailSchedule.createSessionDetailSchedule({
        detailJadwalTrainingId: detailJadwalTraining.id,
        jamMulai: session.jamMulai,
        jamSelesai: session.jamSelesai,
        aktivitas: session.aktivitas,
      })
    )
  );
}


export const createSessionDetailSchedules = async (payload: ICreateSessionDetailTraining): Promise<ISessionDetailTraining> => {
 const { jamMulai, jamSelesai } = payload;

 if (payload.jamSelesai <= payload.jamMulai) {
    throw new HttpError("Jam selesai harus lebih besar dari jam mulai", 400);
 };

 return await sessionDetailSchedule.createSessionDetailSchedule(payload);
};

export const getSessionDetaiScheduleById = async (id: string) => {
  const result = await sessionDetailSchedule.getSessionDetailSchedule(id);

  return result;
}

export const updateSessionDetailSchedule = async (id: string, payload: Partial<ICreateSessionDetailTraining>) => {
  const result = await sessionDetailSchedule.updateSessionDetailSchedule(id, payload);

  return result;
}

export const deleteSessionDetailSchedule = async (id: string) => {
  const result = await sessionDetailSchedule.deleteSessionDetailSchedule(id);

  return result;
}

export const getAllSessionDetailSchedule = async (payload: IPaginationQuery): Promise<{
  data: ISessionDetailTraining[],
  pagination: IResultPagination;
}> => {
  const { page, limit, search } = payload;

  const skip = (page - 1) * limit;

  const where = search
    ? {
        detailJadwalTraining: {
          training: {
            namaTraining: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      }
    : undefined;

  const [data, total] = await Promise.all([
    sessionDetailSchedule.getSessionDetailSchedules({
      skip,
      take: limit,
      where,
      orderBy: { createdAt: 'desc' },
    }),
    sessionDetailSchedule.countSessionDetailSchedule(where),
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
}