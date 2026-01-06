import * as userRepository from "../repositories/user";
import { HttpError } from "../utils/error";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../utils/jwt";
import { ICreateUser, Ilogin } from "../utils/interfaces";
import jwt from "jsonwebtoken";

export const isPasswordMatch = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
}

export const login = async (email: string, password: string): Promise<Ilogin> => {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
        throw new HttpError("User not found!", 404);
    }

    const isPasswordValid = await isPasswordMatch(password, user.password);

    if (!isPasswordValid) {
        throw new HttpError("Invalid password!", 401);
    }

    const token = generateToken({
        id: user.id, // assigning id from user to payload
        email: user.email, // assigning email from user to payload
    });

    return {
        name: user.name,
        role: user.role,
        token,
    };
}

export const verifyTokenAndUser = async (token: string): Promise<ICreateUser> => {
    try {
        const { id } = verifyToken(token); // destructuring id from payload returned by verifyToken function

        const user = await userRepository.getUserById(id);

        if (!user) {
            throw new HttpError("User not found!", 404);
        }

        return user;
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new HttpError("Invalid token!", 401);
        }

        throw error; // using throw to rethrow the error to be handled by the caller
    }
    
}