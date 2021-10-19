import { BadRequestError, NotFoundError, OrderStatus, UnauthorizedError } from "@relace/common";
import { Request, Response } from 'express';

import { amqp } from "../../events/amqp";
import { OrderAcceptedPublisher } from "../../events/publishers/order-accepted.publisher";
import { ItemClass } from "../../models/item";
import { Order } from "../../models/order";

export const acceptOrderController = async (req: Request, res: Response) => {
    const order = await Order.findOne({ uuid: req.params.id }).populate({ path: 'item', model: 'ItemClass' });

    if (!order) throw new NotFoundError();
    if (order.status !== OrderStatus.Pending) throw new BadRequestError('invalid');
    if ((order.item as ItemClass).userUuid !== req.user!.uuid) throw new UnauthorizedError();

    order.status = OrderStatus.AwaitingPayment;
    await order.save();

    await amqp.publish(OrderAcceptedPublisher, {
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