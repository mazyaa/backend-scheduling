import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { Application } from 'express'; // type inside application express is a object with free structure (key: string, value: any) 

const loadMiddlewares = (app: Application): void => {
    app.use(cors({ 
        origin: process.env.FRONTEND_URL,
        credentials: true // allow cookies to be sent with requests
    }));

    app.use(express.json()); // for parsing application/json (AJAX requests)

    app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded (HTML form submissions)

    app.use(morgan('combined')); // logging middleware

    app.use(cookieParser()); // for parsing cookies (req.cookies)
} 

export default loadMiddlewares;