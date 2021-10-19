import { NotFoundError, UnauthorizedError } from "@relace/common";
import { Request, Response } from "express";

import { amqp } from "../events/amqp";
import { ItemUpdatedPublisher } from "../events/publishers/item-updated.publisher";
import { Item } from "../models/item";

export const updateItemController = async (req: Request, res: Response) => {
    const item = await Item.findOne({ uuid: req.params.id });    

    if (!item) throw new NotFoundError();

    if (req.user!.uuid !== item.userUuid) throw new UnauthorizedError();

    Object.assign(item, req.body);
    await item.save();

    await amqp.publish(ItemUpdatedPublisher, {
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        price: item.price,
        userUuid: item.userUuid,
        uuid: item.uuid,
    });

    res.send(item);
};