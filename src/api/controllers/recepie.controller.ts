import { getRecepies } from '../services/recepie.service';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.get('/recepies', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getRecepies(req.query);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

export default router;
