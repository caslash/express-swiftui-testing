import { Request, Response, NextFunction } from 'express';

const handler = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: 'Hello, World' });
  } catch (err) {
    next(err);
  }
};

export default handler;
