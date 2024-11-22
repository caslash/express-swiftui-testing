import { Router } from 'express';

import getPersonHandler from './get';
import postPersonHandler from './post';

export const personRoute = Router();

personRoute.get('/person', getPersonHandler);
personRoute.post('/person', postPersonHandler);
