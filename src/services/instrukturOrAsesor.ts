import * as authRepository from "../repositories/auth";
import * as instrukturOrAsesorRepository from "../repositories/instruturOrAsesor";
import { generateRandomPassword } from "../utils/helper";
import { HttpError } from "../utils/error";
import { ICreateUser, IUser } from "../utils/interfaces";

export const createInstrukturAndAsesor = async (payload: ICreateUser): Promise<Omit<IUser, "password">> => {
    const { name, email, noWa, role, keahlian } = payload;

    const validateEmail = await authRepository.getUserByEmail(email);

    if (validateEmail) {
        throw new HttpError("Email already in use", 409);
    };

    const validateNoWa = await authRepository.getUserByNumberWhatsapp(noWa);

    if (validateNoWa) {
        throw new HttpError("Number WhatsApp already in use", 409);
    }

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
    const {password, ...result} = data; // exclude password from result

    return result;
}

export const getInstrukturOrAsesorById = async (id: string): Promise<Omit<IUser, "password">> => {
    const data = await instrukturOrAsesorRepository.getInstrukturOrAsesorById(id); 
    
    const { password, ...result } = data as IUser; // exclude password from result

    return result;
}

export const getInstrukturOrAsesorByName = async (name: string): Promise<Omit<IUser, "password">[]> => {
    // if name is provided, search by name, else get all instruktur or asesor
    if (name && name.trim() !== '') { // use name.trim() to avoid spaces only
        // search by name
        const data = await instrukturOrAsesorRepository.getInstrukturOrAsesorByName(name);
        const result = data.map(({ password, ...user }) => user); // exclude password from result, must use map because getInstrukturOrAsesorByName returns an array

        if (!data || data.length === 0) {
            throw new HttpError("Instruktur or Asesor not found", 404);
        }

        return result;
    }

    // get all instruktur or asesor
    const data = await instrukturOrAsesorRepository.getAllInstrukturOrAsesor();
    const result = data.map(({ password, ...user }) => user); // exclude password from result, must use map because getAllInstrukturOrAsesor returns an array

    return data;

}

export const updateInstrukturAndAsesor = async (id: string, payload: Partial<ICreateUser>): Promise<Omit<IUser, "password">> => {
    const data = await instrukturOrAsesorRepository.updateInstrukturOrAsesor(id, payload);

    const { password, ...result } = data as IUser; // exclude password from result

    return result;
}

export const deleteInstrukturAndAsesor = async (id: string): Promise<Omit<IUser, "password">> => {
    const data = await instrukturOrAsesorRepository.deleteInstrukturOrAsesor(id);

    const { password, ...result } = data as IUser; // exclude password from result

    return result;
}