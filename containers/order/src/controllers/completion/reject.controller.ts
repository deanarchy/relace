import { BadRequestError, NotFoundError, OrderStatus, UnauthorizedError } from "@relace/common";
import { Request, Response } from "express";

import { amqp } from "../../events/amqp";
import { CompletionRejectedPublisher } from "../../events/publishers/completion-rejected.publisher";
import { ItemClass } from "../../models/item";
import { Order } from "../../models/order";

export const rejectCompletionController = async (req: Request, res: Response) => {
    const order = await Order.findOne({ uuid: req.params.id }).populate({ path: 'item', model: 'ItemClass' });

    if (!order) throw new NotFoundError();
    if (order.status !== OrderStatus.PendingCompletion) throw new BadRequestError('invalid state');
    if (order.userUuid !== req.user!.uuid) throw new UnauthorizedError();

    order.status = OrderStatus.OnProcess;
    await order.save();

    await amqp.publish(CompletionRejectedPublisher, {
        id: order.id,
        status: order.status,
        userUuid: order.userUuid,
        item: {
            uuid: (order.item as ItemClass).uuid,
            price: (order.item as ItemClass).price
        },
        uuid: order.uuid
    });

    res.send(order);
};