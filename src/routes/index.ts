import { Application, Router } from 'express';

const routes = (app: Application) => {
    const router = Router();

    app.use('/api', router); // default prefix for all routes
    
    router.get('/tes', (req, res) => {
        res.status(200).send({ status: 'OK' });
    });
}

export default routes;