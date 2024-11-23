import { Router } from 'express';

import getPeopleHandler from './get';
import postPersonHandler from './post';
import getPersonHandler from './:id/get';
import putPersonHandler from './:id/put';
import deletePersonHandler from './:id/delete';

export const personRoute = Router();

personRoute.get('/person', getPeopleHandler);
personRoute.post('/person', postPersonHandler);
personRoute.get('/person/:id', getPersonHandler);
personRoute.put('/person/:id', putPersonHandler);
personRoute.delete('/person/:id', deletePersonHandler);