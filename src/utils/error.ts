// Custom HTTP Error class
export class HttpError extends Error {
    statusCode: number; // HTTP status code

    constructor(message: string, statusCode: number) { // property message gets from Error class
        // return the error message and status code
        super(message); // call the parent constructor
        this.statusCode = statusCode; // set the status code
    };
}