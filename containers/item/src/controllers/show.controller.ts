import { NotFoundError } from "@relace/common";
import { Request, Response } from "express";

import { Item } from "../models/item";

export const showItemController = async (req: Request, res: Response) => {
    const item = await Item.findOne({ uuid: req.params.id });

    if (!item) throw new NotFoundError();

    res.send(item);
};