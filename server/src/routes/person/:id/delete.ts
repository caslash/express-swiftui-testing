import { Request, Response, NextFunction } from "express";
import Person from "../../../models/person";
import { validate, version } from 'uuid';

const handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!validate(id) || version(id) !== 4) {
            res.status(400).send(`${id} is not valid id.`);
            return;
        }

        const count = await Person.destroy({ where: { id }});

        if (count > 0) {
            console.log("[INFO]", `Removed ${id}`)
            res.status(204).end();
            return;
        }

        res.status(404).send(`Person with id ${id} could not be found.`);
        return;
    } catch (err) {
        next(err);
    }
}

export default handler;