import { Request, Response, NextFunction } from 'express';
import Person from '../../db/models/person';

const handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, age } = req.body;

    if (!name || !age) {
      res.status(400).end();
      return;
    }

    const result = await Person.create({
      name,
      age,
    });

    console.log('[INFO]', `Created ${result.dataValues.name}`);

    res.status(201).json({ id: result.dataValues.id });
  } catch (err) {
    next(err);
  }
};

export default handler;
