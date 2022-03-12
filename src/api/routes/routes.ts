import { Router } from 'express';
import recepieController from '../controllers/recepie.controller';

const api = Router().use(recepieController);

export default Router().use('/api', api);
