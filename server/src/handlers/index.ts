import { Router } from 'express';

import helloWorld from './helloWorld';

let apiRouter = Router().use('/helloWorld', helloWorld);

export { apiRouter };
