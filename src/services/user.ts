import { getUserByEmail } from "../repositories/user";
import { IUser } from "../utils/interfaces";
import { generateRandomPassword } from "../utils/helper";
import { HttpError } from "../utils/error";
import * as userRepository from "../repositories/user";

export const createInstrukturAndAsesor = async (props: IUser): Promise<Omit<IUser, "password">> => {
    const { name, email, noWa, role, keahlian } = props;

    const validateEmail = await getUserByEmail(email);

    if (validateEmail) {
        throw new HttpError("Email already in use", 409);
    };

    const validateNoWa = await userRepository.getUserByNoWa(noWa);

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

    const result = await userRepository.createUser(newUser);
    const {password, ...data} = result; // exclude password from result

    return data;
}

export const getInstrukturAndAsesorByEmail = async (email: string): Promise<IUser | null> => {
    const data = await userRepository.getUserByEmail(email);

    return data;
}

export const getInstrukturAndAsesorByNoWa = async (noWa: string): Promise<IUser | null> => {
    const data = await userRepository.getUserByNoWa(noWa); 

    return data;
}

