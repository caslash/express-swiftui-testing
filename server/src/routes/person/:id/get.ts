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
        
        const result = await Person.findOne({
            where: { id }
        });

        if (result) {
            const { id, name, age } = result.dataValues;

            console.log("[INFO]", `Found ${name}`)

            res.status(200).json({
                id,
                name,
                age
            });
        }
        
        res.status(404).send(`Person with id ${id} could not be found.`);
        return;
    } catch (err) {
        next(err);
    }
}

export default handler;