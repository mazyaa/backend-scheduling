import bcrypt from 'bcrypt';
import * as participantRepo from '../repositories/participant';
import { IPaginationQuery, IResultPagination } from '../utils/interfaces';

export const createPeserta = async (payload: any) => {
    let hashedPassword = payload.password;
    if (payload.password) {
        hashedPassword = await bcrypt.hash(payload.password, 10);
    }

    const newPeserta = await participantRepo.createPeserta({
        ...payload,
        password: hashedPassword
    });

    const { password, ...userWithoutPassword } = newPeserta as any;
    return userWithoutPassword;
};

export const getPesertaById = async (id: string) => {
    const participant = await participantRepo.getPesertaById(id);
    if (!participant) return null;
    
    const { password, ...userWithoutPassword } = participant as any;
    return userWithoutPassword;
};

export const getAllParticipant = async (query: IPaginationQuery) => {
    const { page, limit, search, jadwalTrainingId } = query;
    const skip = (page - 1) * limit;

    let where: any = {};
    
    // Add search conditions
    if (search) {
        where = {
            ...where,
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { noWa: { contains: search, mode: 'insensitive' } }
            ]
        };
    }

    // Filter participants specific to a training schedule if provided
    if (jadwalTrainingId) {
        where.pesertaTraining = {
            some: {
                jadwalTrainingId: jadwalTrainingId
            }
        };
    }

    const [total, results] = await Promise.all([
        participantRepo.countParticipant(where),
        participantRepo.getAllParticipant({ skip, take: limit, where, orderBy: { createdAt: 'desc' } })
    ]);

    const totalPages = Math.ceil(total / limit);

    const safeResults = results.map(row => {
        const { password, ...safeRow } = row as any;
        return safeRow;
    });

    const pagination: IResultPagination = {
        total,
        totalPages,
        currentPage: page,
        limit,
        hasNext: page < totalPages,
        hasPrevious: page > 1
    };

    return { results: safeResults, pagination };
};

export const updatePeserta = async (id: string, payload: any) => {
    const updateData = { ...payload };
    
    if (payload.password) {
        updateData.password = await bcrypt.hash(payload.password, 10);
    } else {
        delete updateData.password; // Do not update password if not provided
    }

    const updatedPeserta = await participantRepo.updatePeserta(id, updateData);
    const { password, ...userWithoutPassword } = updatedPeserta as any;
    return userWithoutPassword;
};

export const deletePeserta = async (id: string) => {
    const deletedPeserta = await participantRepo.deletePeserta(id);
    const { password, ...userWithoutPassword } = deletedPeserta as any;
    return userWithoutPassword;
};
