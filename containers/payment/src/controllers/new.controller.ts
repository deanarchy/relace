import { BadRequestError, NotFoundError, OrderStatus, UnauthorizedError } from "@relace/common";
import { Request, Response } from "express";
import { amqp } from "../events/amqp";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created.publisher";

import { Order } from "../models/order";
import { Payment } from "../models/payment";
import { stripe } from "../stripe";

export const newPaymentController = async (req: Request, res: Response) => {
    const { token, orderUuid } = req.body;

    const order = await Order.findOne({ uuid: orderUuid });

    if(!order) throw new NotFoundError();
    if(order.userUuid !== req.user!.uuid) throw new UnauthorizedError();
    if(order.status !== OrderStatus.AwaitingPayment) throw new BadRequestError('invalid state');
    
    const charge = await stripe.charges.create({
        amount: order.price * 100,
        currency: 'usd',
        source: token
    });

    const payment = new Payment({
        orderUuid: order.uuid,
        stripeId: charge.id
    });
    await payment.save();

    await amqp.publish(PaymentCreatedPublisher, {
        stripeId: payment.stripeId,
        orderUuid: payment.orderUuid
    });

    res.status(201).send(payment);
};