import * as authRepository from "../repositories/auth";
import * as instrukturOrAsesorRepository from "../repositories/instruturOrAsesor";
import { generateRandomPassword } from "../utils/helper";
import { HttpError } from "../utils/error";
import { IUser } from "../utils/interfaces";

export const createInstrukturAndAsesor = async (props: IUser): Promise<Omit<IUser, "password">> => {
    const { name, email, noWa, role, keahlian } = props;

    const validateEmail = await authRepository.getUserByEmail(email);

    if (validateEmail) {
        throw new HttpError("Email already in use", 409);
    };

    const validateNoWa = await authRepository.getUserByNumberWhatsapp(noWa);

    if (validateNoWa) {
        throw new HttpError("Number WhatsApp already in use", 409);
    }

    const randomPassword = generateRandomPassword(12);

    const newUser: IUser = {
        name,
        email,
        noWa,
        role,
        password: randomPassword,
        keahlian,
    };

    const result = await instrukturOrAsesorRepository.createInstrukturOrAsesor(newUser);
    const {password, ...data} = result; // exclude password from result

    return data;
}