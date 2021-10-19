import { NotFoundError, UnauthorizedError } from "@relace/common";
import { Request, Response } from "express";
import { amqp } from "../events/amqp";
import { OrderIssuedPublisher } from "../events/publishers/order-issued.publisher";
import { Item } from "../models/item";
import { Order } from "../models/order";

export const newOrderController = async (req: Request, res: Response) => {
    const { itemUuid } = req.body;

    const item = await Item.findOne({ uuid: itemUuid });
    //TODO: SHOULD BE FORBIDDEN
    if (!item) throw new NotFoundError();
    if (item.userUuid === req.user!.uuid) throw new UnauthorizedError();

    const order = new Order({
        userUuid: req.user!.uuid,
        item
    });
    await order.save();

    await amqp.publish(OrderIssuedPublisher, {
        id: order.id,
        status: order.status,
        userUuid: order.userUuid,
        item: {
            uuid: item.uuid,
            price: item.price
        },
        uuid: order.uuid
    });

    res.status(201).send(order);
};