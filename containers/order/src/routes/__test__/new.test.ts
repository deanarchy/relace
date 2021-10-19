import { JWTGenerator } from '@relace/common';
import request from 'supertest';
import { v4 } from 'uuid';

import { app } from '../../app';
import { amqp } from '../../events/amqp';
import { OrderIssuedPublisher } from '../../events/publishers/order-issued.publisher';

import { Item } from '../../models/item';

describe('new order controller test', () => {
    const title = 'test title';
    const price = 40;
    const userUuid = v4();
    const uuid = v4();

    it('return 201 on successful order', async () => {
        let item = new Item({ title, price, userUuid, uuid });;
        await item.save();

        await request(app)
            .post('/api/orders')
            .send({ itemUuid: item.uuid })
            .set('Authorization', JWTGenerator())
            .expect(201)
    });

    it('provider cannot order its own item', async () => {
        let item = new Item({ title, price, userUuid, uuid });;
        await item.save();

        await request(app)
            .post('/api/orders')
            .send({ itemUuid: item.uuid })
            .set('Authorization', JWTGenerator(userUuid))
            .expect(401)
    });

    it('publish an OrderIssued event', async () => {
        let item = new Item({ title, price, userUuid, uuid });;
        await item.save();

        await request(app)
            .post('/api/orders')
            .send({ itemUuid: item.uuid })
            .set('Authorization', JWTGenerator())

        expect(amqp.publish).toHaveBeenCalledWith(OrderIssuedPublisher, expect.any(Object));
    });
});