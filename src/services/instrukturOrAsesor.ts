import * as instrukturOrAsesorRepository from '../repositories/instruturOrAsesor';
import {
  ICreateUser,
  IPaginationQuery,
  IResultPagination,
  IUser,
  IUserWithoutPassword,
} from '../utils/interfaces';

export const createInstrukturAndAsesor = async (payload: Omit<ICreateUser, 'password'>): Promise<IUser> => {
  const data = await instrukturOrAsesorRepository.createInstrukturOrAsesor(payload);

 const { password, ...result } = data;

  return result;
};

export const getInstrukturOrAsesorById = async (id: string): Promise<IUser | null> => {
  const data = await instrukturOrAsesorRepository.getInstrukturOrAsesorById(id);

  if (data !== null) {
    const { password, ...result } = data;

    return result;
  }

  return null;
};

export const getAllInstrukturOrAsesor = async (
  payload: IPaginationQuery,
): Promise<{
  data: IUserWithoutPassword[];
  pagination: IResultPagination;
}> => {
  const { page, limit, search } = payload;

  const skip = (page - 1) * limit; // for skipping data ex: page 2 => (2-1)*10 = 10 data will be skipped

  // search filter
  const where = search
    ? {
        name: {
          contains: search, // contains is like operator in SQL so it will search for name that contains the search keyword
          mode: 'insensitive', // case insensitive ex: "John" = "john"
        },
      }
    : undefined;

  const [data, total] = await Promise.all([ // Promise.all to run multiple async task simultaneously
    // task 1: get all instruktur or asesor with pagination
    instrukturOrAsesorRepository.getAllInstrukturOrAsesor({
      skip,
      take: limit,
      where,
      orderBy: { createdAt: 'desc' }, // order by data newest first
    }),

    // task 2: count total instruktur or asesor
    instrukturOrAsesorRepository.countInstrukturOrAsesor(where),
  ]);

  const result = (data as IUser[]).map(({ password, ...result }) => result);

  const totalPages = Math.ceil(total / limit); // use Math.ceil to round up the total pages ex: 95/10 = 9.5 => 10 pages

  return {
    data: result,
    pagination: {
      total, // total data
      totalPages,
      currentPage: page,
      limit,
      hasNext: page < totalPages, // if not last page, true
      hasPrevious: page > 1, // if not first page, true (not on page 1)
    },
  };
};

export const updateInstrukturAndAsesor = async (
  id: string,
  payload: Omit<ICreateUser, 'password'>, 
): Promise<IUser> => {
  const data = await instrukturOrAsesorRepository.updateInstrukturOrAsesor(id, payload);

  const { password, ...result } = data;

  return result;
};

export const deleteInstrukturAndAsesor = async (id: string): Promise<IUser> => {
  const data = await instrukturOrAsesorRepository.deleteInstrukturOrAsesor(id);

  const { password, ...result } = data;

  return result;
};
