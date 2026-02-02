import * as instrukturOrAsesorRepository from '../repositories/instruturOrAsesor';
import { generateRandomPassword } from '../utils/helper';
import {
  ICreateUser,
  IPaginationQuery,
  IResultPagination,
  IUser,
} from '../utils/interfaces';

export const createInstrukturAndAsesor = async (payload: ICreateUser): Promise<Omit<IUser, 'password'>> => {
  const { name, email, noWa, role, keahlian } = payload;

  const randomPassword = generateRandomPassword(12);

  const newUser: ICreateUser = {
    name,
    email,
    noWa,
    role,
    password: randomPassword,
    keahlian,
  };

  const data = await instrukturOrAsesorRepository.createInstrukturOrAsesor(newUser);
  const { password, ...result } = data; // exclude password from result

  return result;
};

export const getInstrukturOrAsesorById = async (id: string): Promise<Omit<IUser, 'password'>> => {
  const data = await instrukturOrAsesorRepository.getInstrukturOrAsesorById(id);

  const { password, ...result } = data as IUser; // exclude password from result

  return result;
};

export const getAllInstrukturOrAsesor = async (
  payload: IPaginationQuery,
): Promise<{
  data: Omit<IUser, 'password'>[];
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

  const result = (data as IUser[]).map(({ password, ...rest }) => rest); // exclude password from each result

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
  payload: ICreateUser, 
): Promise<Omit<IUser, 'password'>> => {
  const data = await instrukturOrAsesorRepository.updateInstrukturOrAsesor(id, payload);

  const { password, ...result } = data as IUser; // exclude password from result

  return result;
};

export const deleteInstrukturAndAsesor = async (id: string): Promise<Omit<IUser, 'password'>> => {
  const data = await instrukturOrAsesorRepository.deleteInstrukturOrAsesor(id);

  const { password, ...result } = data as IUser; // exclude password from result

  return result;
};
