import { ValidationError } from "joi";

export const generateJoiErrorMessage = (error: ValidationError): string => {
    const errorDetails = error.details.map((err: any) => err.message);
    return errorDetails.join(', '); // use commas to separate multiple error messages
}

export const generateRandomPassword = (length: number = 8): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}