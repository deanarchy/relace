import { JWTGenerator, OrderStatus } from "@relace/common";
import { v4 } from "uuid";
import request from 'supertest';

import { Item } from "../../../models/item";
import { Order } from "../../../models/order";
import { app } from "../../../app";
import { amqp } from "../../../events/amqp";
import { CompletionIssuedPublisher } from "../../../events/publishers/completion-issued.publisher";

describe('new completion controller', () => {
    const title = 'test title';
    const price = 40;
    const providerUuid = v4();
    const customerUuid = v4();
    const uuid = v4();

    it('only the provider can issue completion', async () => {
        const item = new Item({ title, price, userUuid: providerUuid, uuid });
        await item.save();

        const order = new Order({ userUuid: customerUuid, item, status: OrderStatus.OnProcess });
        await order.save();

        await request(app)
            .post(`/api/orders/${order.uuid}/complete`)
            .set('Authorization', JWTGenerator(customerUuid))
            .expect(401)

        await request(app)
            .post(`/api/orders/${order.uuid}/complete`)
            .set('Authorization', JWTGenerator())
            .expect(401)
    });

    it('order must be on OnProcess status', async () => {
        const item = new Item({ title, price, userUuid: providerUuid, uuid });
        await item.save();

        const order = new Order({ userUuid: customerUuid, item, status: OrderStatus.Pending });
        await order.save();

        await request(app)
            .post(`/api/orders/${order.uuid}/complete`)
            .set('Authorization', JWTGenerator(providerUuid))
            .expect(400)
    });

    it('return 200 after issuing completion', async () => {
        const item = new Item({ title, price, userUuid: providerUuid, uuid });
        await item.save();

        const order = new Order({ userUuid: customerUuid, item, status: OrderStatus.OnProcess });
        await order.save();

        await request(app)
            .post(`/api/orders/${order.uuid}/complete`)
            .set('Authorization', JWTGenerator(providerUuid))
            .expect(200)
    });

    it('order status would be PendingCompletion after issuing completion', async () => {
        const item = new Item({ title, price, userUuid: providerUuid, uuid });
        await item.save();

        const order = new Order({ userUuid: customerUuid, item, status: OrderStatus.OnProcess });
        await order.save();

        await request(app)
            .post(`/api/orders/${order.uuid}/complete`)
            .set('Authorization', JWTGenerator(providerUuid))
            .expect(200)

        const updatedOrder = await Order.findOne({ uuid: order.uuid });

        expect(updatedOrder!.status).toBe(OrderStatus.PendingCompletion)
    });

    it('publish an CompletionIssued event', async () => {
        const item = new Item({ title, price, userUuid: providerUuid, uuid });
        await item.save();

        const order = new Order({ userUuid: customerUuid, item, status: OrderStatus.OnProcess });
        await order.save();

        await request(app)
            .post(`/api/orders/${order.uuid}/complete`)
            .set('Authorization', JWTGenerator(providerUuid))
            .expect(200)

        expect(amqp.publish).toHaveBeenCalledWith(CompletionIssuedPublisher, expect.any(Object));
    });
});