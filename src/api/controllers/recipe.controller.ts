import { NextFunction, Request, Response, Router } from 'express';
import { getAllRecipes } from '../services/recipe.service';
import logger from '../../config/winston';

const router = Router();

//get all recipes
router.get('/recipes', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // logger.info(req.);
        const result = await getAllRecipes();
        res.json(result);
    } catch (e) {
        next(e);
        logger.error(e);
    }
});

//get filtered recipes
router.post('/recipes', async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (e) {
        next(e);
        logger.error(e);
    }
});

//

export default router;
