import { BadRequestError, NotFoundError, OrderStatus, UnauthorizedError } from "@relace/common";
import { Request, Response } from "express";

import { amqp } from "../../events/amqp";
import { CompletionAcceptedPublisher } from "../../events/publishers/completion-accepted.publisher";
import { OrderCompletedPublisher } from "../../events/publishers/order-completed.publisher";
import { ItemClass } from "../../models/item";
import { Order } from "../../models/order";

export const acceptCompletionController = async (req: Request, res: Response) => {
    const order = await Order.findOne({ uuid: req.params.id }).populate({ path: 'item', model: 'ItemClass' });

    if (!order) throw new NotFoundError();
    if (order.status !== OrderStatus.PendingCompletion) throw new BadRequestError('invalid state');
    if (order.userUuid !== req.user!.uuid) throw new UnauthorizedError();

    order.status = OrderStatus.Complete;
    await order.save();

    await amqp.publish(CompletionAcceptedPublisher, {
        id: order.id,
        status: order.status,
        userUuid: order.userUuid,
        item: {
            uuid: (order.item as ItemClass).uuid,
            price: (order.item as ItemClass).price
        },
        uuid: order.uuid
    });

    await amqp.publish(OrderCompletedPublisher, {
        id: order.id,
        status: order.status,
        userUuid: order.userUuid,
        item: {
            uuid: (order.item as ItemClass).uuid,
            price: (order.item as ItemClass).price,
            userUuid: (order.item as ItemClass).userUuid
        },
        uuid: order.uuid
    });

    res.send(order);
};