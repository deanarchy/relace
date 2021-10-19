import { JWTGenerator } from '@relace/common';
import request from 'supertest';
import { v4 } from 'uuid';

import { app } from '../../app';
import { amqp } from '../../events/amqp';
import { ItemUpdatedPublisher } from '../../events/publishers/item-updated.publisher';
import { Item } from '../../models/item';

describe('update item route test', () => {
    const title = 'test title';
    const subtitle = 'lorem ipsum';
    const description = 'lorem ipsum dolor sit';
    const price = 20;
    const userUuid = v4();

    it('return 404 if item not found', async () => {
        await request(app)
            .put(`/api/items/${v4()}`)
            .set('Authorization', JWTGenerator())
            .expect(404)
    });

    it('return 401 after unauthorized update', async () => {
        const item = new Item({ title, subtitle, description, price, userUuid })
        await item.save();

        await request(app)
            .put(`/api/items/${item.uuid}`)
            .set('Authorization', JWTGenerator())
            .expect(401)
    });

    it('return 200 after successful update', async () => {
        const item = new Item({ title, subtitle, description, price, userUuid })
        await item.save();

        await request(app)
            .put(`/api/items/${item.uuid}`)
            .set('Authorization', JWTGenerator(userUuid))
            .send({
                title: 'updated title',
                description: 'updated subtitle'
            })
            .expect(200)
    });

    it('return a proper format after updating', async () => {
        const item = new Item({ title, subtitle, description, price, userUuid })
        await item.save();

        const res = await request(app)
            .put(`/api/items/${item.uuid}`)
            .set('Authorization', JWTGenerator(userUuid))
            .send({
                title: 'updated title',
                description: 'updated desc'
            })
            .expect(200)

        expect(res.body.title).toBe('updated title');
        expect(res.body.description).toBe('updated desc');
    });

    it('publish an ItemUpdated event', async () => {
        const item = new Item({ title, subtitle, description, price, userUuid })
        await item.save();

        const res = await request(app)
            .put(`/api/items/${item.uuid}`)
            .set('Authorization', JWTGenerator(userUuid))
            .send({
                title: 'updated title',
                description: 'updated desc'
            })
            .expect(200)

        expect(amqp.publish).toHaveBeenCalledWith(ItemUpdatedPublisher, expect.any(Object));
    });
});