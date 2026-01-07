import { ValidationError } from "joi";

export const generateJoiErrorMessage = (error: ValidationError): string => {
    const errorDetails = error.details.map((err: any) => err.message);
    return errorDetails.join(', '); // use commas to separate multiple error messages
}