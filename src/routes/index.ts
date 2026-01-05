import { Application, Router } from 'express';

const routes = (app: Application) => {
    const router = Router();

    app.use('/api', router); // default prefix for all routes
    
   
}

export default routes;