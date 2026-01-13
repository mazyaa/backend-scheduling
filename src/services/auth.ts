import * as authRepository from "../repositories/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HttpError } from "../utils/error";
import { generateToken, verifyToken } from "../utils/jwt";
import { Ilogin, IUser } from "../utils/interfaces";

export const isPasswordMatch = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
}

export const login = async (email: string, password: string): Promise<Ilogin> => {
    const user = await authRepository.getUserByEmail(email);

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

export const verifyTokenAndUser = async (token: string): Promise<IUser> => {
    try {
        const { id } = verifyToken(token); // destructuring id from payload returned by verifyToken function

        const user = await authRepository.getUserById(id);
       
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

export const getUserById = async (id: string): Promise<IUser | null> => {
    const data = await authRepository.getUserById(id);

    return data;
}


export const getUserByEmail = async (email: string): Promise<IUser | null> => {
    const data = await authRepository.getUserByEmail(email);

    return data;
}

export const getUserByNumberWhatsapp = async (noWa: string): Promise<IUser | null> => {
    const data = await authRepository.getUserByNumberWhatsapp(noWa); 

    return data;
}