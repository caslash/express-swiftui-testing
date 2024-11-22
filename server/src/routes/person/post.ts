import { Request, Response, NextFunction } from 'express';
import Person from '../../models/person';

const handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, age } = req.body;
    const result = await Person.create({
      name,
      age,
    });
    res.status(201).json({ id: result.dataValues.id });
  } catch (err) {
    next(err);
  }
};

export default handler;
