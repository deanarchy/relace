import { Request, Response } from "express";

import { amqp } from "../events/amqp";
import { ItemCreatedPublisher } from "../events/publishers/item-created.publisher";
import { Item } from "../models/item";

export const newItemController = async (req: Request, res: Response) => {
    const item = new Item();

    Object.assign(item, req.body);
    item.userUuid = req.user!.uuid;

    await item.save();

    await amqp.publish(ItemCreatedPublisher, {
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        price: item.price,
        userUuid: item.userUuid,
        uuid: item.uuid,
    });

    res.status(201).send(item);
};