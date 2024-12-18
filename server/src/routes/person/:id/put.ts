import { Request, Response, NextFunction } from 'express';
import Person from '../../../db/models/person';
import { validate, version } from 'uuid';

const handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!validate(id) || version(id) !== 4) {
      res.status(400).send(`${id} is not valid id.`);
      return;
    }

    const { name, age } = req.body;

    await Person.update({ name, age }, { where: { id } });

    console.log('[INFO]', `Updated ${name}`);

    res.status(200).end();
    return;
  } catch (err) {
    next(err);
  }
};

export default handler;
