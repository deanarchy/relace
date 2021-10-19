import { cookieJWTGenerator } from '@relace/common';
import request from 'supertest';

import { app } from '../../app';
import { amqp } from '../../events/amqp';
import { ItemCreatedPublisher } from '../../events/publishers/item-created.publisher';

describe('new item route test', () => {
    const title = 'test title';
    const subtitle = 'lorem ipsum';
    const description = 'lorem ipsum dolor sit';
    const price = 20;
    const route = '/api/items'


    it('return a 201 message after successful create', async () => {
        await request(app)
            .post(route)
            .send({ title, price, subtitle, description })
            .set('Cookie', cookieJWTGenerator())
            .expect(201)
    });

    it('return a proper format after creating', async () => {
        const res = await request(app)
            .post(route)
            .send({ title, price, subtitle, description })
            .set('Cookie', cookieJWTGenerator())

        expect(res.body.title).toBeDefined();
        expect(res.body.price).toBeDefined();
        expect(res.body.description).toBeDefined();
        expect(res.body.subtitle).toBeDefined();

    });

    it('publish an ItemCreated event', async () => {
        await request(app)
            .post(route)
            .send({ title, price, subtitle, description })
            .set('Cookie', cookieJWTGenerator())

        expect(amqp.publish).toHaveBeenCalledWith(ItemCreatedPublisher, expect.any(Object));
    });
});

