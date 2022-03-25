import { getRecepies, getRecepie ,createRecepie} from '../services/recepie.service';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.get('/recepies', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getRecepies();
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/recepie/:slug', async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const article = await getRecepie(req.params.slug);
        res.json({ article });
    } catch (error) {
        next(error);
    }
});

router.post('/recepie', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const article = await createRecepie({
            title: req.body.title,
            content: req.body.description,
            slug: req.body.title,
            ingredients: req.body.ingredients,
        });
        res.json({ article });
    } catch (error) {
        next(error);
    }
});

export default router;
