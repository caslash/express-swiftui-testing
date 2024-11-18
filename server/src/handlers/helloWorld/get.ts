import { Request, Response, Router, NextFunction } from 'express';

const router = Router();

router.get('/helloWorld', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: 'Hello, World' });
  } catch (err) {
    next(err);
  }
});
