import { v4 } from "uuid";
import request from 'supertest';

import { Order } from "../../models/order";
import { app } from "../../app";
import { JWTGenerator, OrderStatus } from "@relace/common";
import { amqp } from "../../events/amqp";
import { PaymentCreatedPublisher } from "../../events/publishers/payment-created.publisher";

describe('new payment controller', () => {
    const customerUuid = v4();
    const orderUuid = v4();
    const price = 40;

    it('return 201 after successful payment', async () => {
        const order = new Order({ userUuid: customerUuid, price, uuid: orderUuid });
        await order.save();

        await request(app)
            .post('/api/payments')
            .send({
                orderUuid,
                token: 'tok_us'
            })
            .set('Authorization', JWTGenerator(customerUuid))
            .expect(201)
    });

    it('publish PaymentCreated event after successful payment', async () => {
        const order = new Order({ userUuid: customerUuid, price, uuid: orderUuid });
        await order.save();

        await request(app)
            .post('/api/payments')
            .send({
                orderUuid,
                token: 'tok_us'
            })
            .set('Authorization', JWTGenerator(customerUuid))
            .expect(201)

        expect(amqp.publish).toBeCalledWith(PaymentCreatedPublisher, expect.any(Object));
    });

    it('only the customer can pay for the order', async () => {
        const order = new Order({ userUuid: customerUuid, price, uuid: orderUuid });
        await order.save();

        await request(app)
            .post('/api/payments')
            .send({
                orderUuid,
                token: 'tok_us'
            })
            .set('Authorization', JWTGenerator())
            .expect(401)
    });

    it('customer can only pay for the order who have AwaitingPayment status', async () => {
        const order = new Order({ userUuid: customerUuid, price, uuid: orderUuid, status: OrderStatus.Pending });
        await order.save();

        await request(app)
            .post('/api/payments')
            .send({
                orderUuid,
                token: 'tok_us'
            })
            .set('Authorization', JWTGenerator(customerUuid))
            .expect(400)
    });

});