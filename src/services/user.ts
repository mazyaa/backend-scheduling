import { getUserByEmail } from "../repositories/user";
import { IUser } from "../utils/interfaces";
import { generateRandomPassword } from "../utils/helper";
import * as userRepository from "../repositories/user";

export const createInstrukturAndAsesor = async (props: IUser): Promise<IUser> => {
    const { name, email, noWa, role, keahlian } = props;

    const user = await getUserByEmail(email);

    if (user) {
        throw new Error('User with this email already exists');
    };

    const randomPassword = generateRandomPassword();

    const newUser: IUser = {
        name,
        email,
        noWa,
        role,
        password: randomPassword,
        keahlian,
    };

    const data = await userRepository.createUser(newUser);

    return data;
}