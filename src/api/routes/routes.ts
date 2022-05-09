import { Router } from 'express';
import recipeController from '../controllers/recipe.controller';

const api = Router().use(recipeController);

export default Router().use('/api', api);
