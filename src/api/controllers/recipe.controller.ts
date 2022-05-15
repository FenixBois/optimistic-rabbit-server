import { NextFunction, Request, Response, Router } from 'express';
import { getAllRecipes } from '../services/recipe.service';
import logger from '../../config/winston';
import { query, ValidationChain } from 'express-validator';

const router = Router();

const FilterValidation: ValidationChain[] = [
    query('servings').if(query('servings').exists()).isNumeric(),
    query('time').if(query('time').exists()).isNumeric(),
    query('reference').if(query('reference').exists()).isString(),
    query('difficulty').if(query('difficulty').exists()).isIn(['EASY', 'MEDIUM', 'HARD']),
    query('media').if(query('media').exists()).isIn(['MOVIE', 'BOOK', 'GAME']),
    query('taste').if(query('taste').exists()).isIn(['SWEET', 'SALTY', 'SOUR', 'BITTER', 'SPICY']),
    query('vegetarian').if(query('vegetarian').exists()).isBoolean(),
];

//get all/filtered recipes
router.get('/recipes', ...FilterValidation, async (req: Request, res: Response, next: NextFunction) => {
    try {
        // logger.info(req.);
        const result = await getAllRecipes(req.query);
        logger.info(req.query);
        res.json(result);
    } catch (e) {
        logger.error(e);
        next();
    }
});

//get filtered recipes
// router.post('/recipes', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//     } catch (e) {
//         next(e);
//         logger.error(e);
//     }
// });

//get recipe detail
router.get('/recipe/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (e) {
        next(e);
        logger.error(e);
    }
});

export default router;
