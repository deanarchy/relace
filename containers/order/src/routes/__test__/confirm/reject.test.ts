import { JWTGenerator, OrderStatus } from '@relace/common';
import request from 'supertest';
import { v4 } from 'uuid';

import { app } from '../../../app';
import { amqp } from '../../../events/amqp';
import { OrderCancelledPublisher } from '../../../events/publishers/order-cancelled.publisher';
import { Item } from '../../../models/item';
import { Order } from '../../../models/order';

describe('reject order controller test', () => {
    const title = 'test title';
    const price = 40;
    const userUuid = v4();
    const uuid = v4();

    it('return 200 after order rejected', async () => {
        const item = new Item({ title, price, userUuid, uuid });
        await item.save();

        const order = new Order({ userUuid: v4(), item });
        await order.save();

        await request(app)
            .delete(`/api/orders/${order.uuid}/request`)
            .set('Authorization', JWTGenerator(userUuid))
            .expect(200)
    });

    it('update the order status to AwaitingPayment', async () => {
        const item = new Item({ title, price, userUuid, uuid });
        await item.save();

        const order = new Order({ userUuid: v4(), item });
        await order.save();

        await request(app)
            .delete(`/api/orders/${order.uuid}/request`)
            .set('Authorization', JWTGenerator(userUuid))

        const updatedOrder = await Order.findOne({ uuid: order.uuid });

        expect(updatedOrder!.status).toBe(OrderStatus.Cancelled);
    });

    it('only the provider can accept the order', async () => {
        const item = new Item({ title, price, userUuid, uuid });
        await item.save();

        const order = new Order({ userUuid: v4(), item });
        await order.save();

        await request(app)
            .delete(`/api/orders/${order.uuid}/request`)
            .set('Authorization', JWTGenerator())
            .expect(401)
    });

    it('only process the order in appropriate state', async () => {
        const item = new Item({ title, price, userUuid, uuid });
        await item.save();

        const order = new Order({ userUuid: v4(), item, status: OrderStatus.Complete });
        await order.save();

        await request(app)
            .delete(`/api/orders/${order.uuid}/request`)
            .set('Authorization', JWTGenerator())
            .expect(400)
    });

    it('publish an OrderCancelled event', async () => {
        const item = new Item({ title, price, userUuid, uuid });
        await item.save();

        const order = new Order({ userUuid: v4(), item });
        await order.save();

        await request(app)
            .delete(`/api/orders/${order.uuid}/request`)
            .set('Authorization', JWTGenerator(userUuid))

        expect(amqp.publish).toHaveBeenCalledWith(OrderCancelledPublisher, expect.any(Object));
    });

});