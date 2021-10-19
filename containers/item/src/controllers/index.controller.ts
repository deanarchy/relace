import { Request, Response } from "express";

import { Item } from "../models/item";

export const indexItemController = async (req: Request, res: Response) => {
    const items = await Item.find();

    res.send(items);
};