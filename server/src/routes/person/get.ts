import { Request, Response, NextFunction } from 'express';
import Person from '../../models/person';

const handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const people = await Person.findAll();
    
    res.status(200).json(people);
  } catch (err) {
    next(err);
  }
};

export default handler;
