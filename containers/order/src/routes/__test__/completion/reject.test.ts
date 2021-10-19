import { JWTGenerator, OrderStatus } from "@relace/common";
import { v4 } from "uuid";
import request from 'supertest';

import { Item } from "../../../models/item";
import { Order } from "../../../models/order";
import { app } from "../../../app";
import { amqp } from "../../../events/amqp";
import { CompletionRejectedPublisher } from "../../../events/publishers/completion-rejected.publisher";

describe('reject completion controller', () => {
    const title = 'test title';
    const price = 40;
    const providerUuid = v4();
    const customerUuid = v4();
    const uuid = v4();

    it('only the customer can reject completion', async () => {
        const item = new Item({ title, price, userUuid: providerUuid, uuid });
        await item.save();

        const order = new Order({ userUuid: customerUuid, item, status: OrderStatus.PendingCompletion });
        await order.save();

        await request(app)
            .delete(`/api/orders/${order.uuid}/complete`)
            .set('Authorization', JWTGenerator(providerUuid))
            .expect(401)

        await request(app)
            .delete(`/api/orders/${order.uuid}/complete`)
            .set('Authorization', JWTGenerator())
            .expect(401)
    });

    it('order must be on PendingCompletion status', async () => {
        const item = new Item({ title, price, userUuid: providerUuid, uuid });
        await item.save();

        const order = new Order({ userUuid: customerUuid, item, status: OrderStatus.OnProcess });
        await order.save();

        await request(app)
            .delete(`/api/orders/${order.uuid}/complete`)
            .set('Authorization', JWTGenerator(customerUuid))
            .expect(400)
    });

    it('return 200 after rejecting completion', async () => {
        const item = new Item({ title, price, userUuid: providerUuid, uuid });
        await item.save();

        const order = new Order({ userUuid: customerUuid, item, status: OrderStatus.PendingCompletion });
        await order.save();

        await request(app)
            .delete(`/api/orders/${order.uuid}/complete`)
            .set('Authorization', JWTGenerator(customerUuid))
            .expect(200)
    });

    it('order status would be OnProcess after rejecting completion', async () => {
        const item = new Item({ title, price, userUuid: providerUuid, uuid });
        await item.save();

        const order = new Order({ userUuid: customerUuid, item, status: OrderStatus.PendingCompletion });
        await order.save();

        await request(app)
            .delete(`/api/orders/${order.uuid}/complete`)
            .set('Authorization', JWTGenerator(customerUuid))
            .expect(200)

        const updatedOrder = await Order.findOne({ uuid: order.uuid });

        expect(updatedOrder!.status).toBe(OrderStatus.OnProcess);
    });

    it('publish an CompletionRejected event', async () => {
        const item = new Item({ title, price, userUuid: providerUuid, uuid });
        await item.save();

        const order = new Order({ userUuid: customerUuid, item, status: OrderStatus.PendingCompletion });
        await order.save();

        await request(app)
            .delete(`/api/orders/${order.uuid}/complete`)
            .set('Authorization', JWTGenerator(customerUuid))
            .expect(200)

        expect(amqp.publish).toHaveBeenCalledWith(CompletionRejectedPublisher, expect.any(Object));
    });
});