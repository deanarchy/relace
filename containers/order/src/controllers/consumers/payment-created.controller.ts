import { OrderStatus, PaymentCreatedEvent } from "@relace/common";
import { Message } from "amqplib";
import { Order } from "../../models/order";

export const paymentCreatedController = async (data: PaymentCreatedEvent['data'], msg: Message) => {
    try {
        const {stripeId, OrderUuid} = data;

        const order = await Order.findOne({ uuid: OrderUuid });

        if(!order) throw new Error("order not found");
        
        order.status = OrderStatus.OnProcess;
        await order.save();

    } catch (e) {
        throw e;
    };
};