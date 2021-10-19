import { NotFoundError, UnauthorizedError } from "@relace/common";
import { Request, Response } from "express";

import { amqp } from "../events/amqp";
import { ItemDeletedPublisher } from "../events/publishers/item-deleted.publisher";
import { Item } from "../models/item";

export const deleteItemController = async (req: Request, res: Response) => {
    const item = await Item.findOne({ uuid: req.params.id });

    if(!item) throw new NotFoundError();

    if(req.user!.uuid !== item.userUuid) {
        throw new UnauthorizedError();
    };

    await item.delete();

    await amqp.publish(ItemDeletedPublisher, {
        id: item.id,
        userUuid: item.userUuid,
        uuid: item.uuid
    })

    res.status(204).send();
};