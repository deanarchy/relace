import { BadRequestError, OrderAcceptedEvent, OrderStatus } from "@relace/common";
import { Message } from "amqplib";

import { Order } from "../../models/order";

export const orderAcceptedController = async (data: OrderAcceptedEvent['data'], msg: Message) => {
    try {
        const { userUuid, uuid, item, status } = data;

        if (status !== OrderStatus.AwaitingPayment) throw new BadRequestError('invalid state');

        const order = new Order({ userUuid, uuid, price: item.price });
        await order.save();

    } catch (e) {
        throw e;
    }
};