import { Router } from 'express';

import getHelloWorldHandler from './get';

export const helloWorldRoute = Router();

helloWorldRoute.get('/helloWorld', getHelloWorldHandler);
