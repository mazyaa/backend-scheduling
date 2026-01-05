import { HttpError } from "../utils/error";
import { Request, Response, NextFunction, Application } from "express";

// Middleware to handle 404 Not Found errors
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = new HttpError(`Route Not Found - ${req.originalUrl}`, 404); // create new HttpError instance
    next(error); // pass the error to the next middleware
};

// General error handling middleware
const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) { // check if the error is an instance of HttpError
        res.status(err.statusCode).json({ message: err.message }); // send JSON response with status code and message
    }

    if (err instanceof Error) { // check if the error is an instance of Error
        res.status(500).json({ message: err.message }); // send JSON response with status code 500 and message
    }

    res.status(500).json({ message: 'Internal Server Error' }); // default response for unknown errors
}

export const loadErrorMiddlewares = (app: Application) => {
    app.use(notFoundHandler); 
    app.use(errorHandler); 
}