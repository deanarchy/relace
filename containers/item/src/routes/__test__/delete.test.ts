import { JWTGenerator } from '@relace/common';
import request from 'supertest';
import { v4 } from 'uuid';

import { app } from '../../app';
import { amqp } from '../../events/amqp';
import { ItemDeletedPublisher } from '../../events/publishers/item-deleted.publisher';
import { Item } from '../../models/item';

describe('delete item route test', () => {
    const title = 'test title';
    const subtitle = 'lorem ipsum';
    const description = 'lorem ipsum dolor sit';
    const price = 20;
    const userUuid = v4();

    it('return 401 after unauthorized delete', async () => {
        const item = new Item({ title, subtitle, description, price, userUuid });
        await item.save();

        await request(app)
            .delete(`/api/items/${item.uuid}`)
            .set('Authorization', JWTGenerator())
            .expect(401)
    });

    it('return 204 after successful delete', async () => {
        const item = new Item({ title, subtitle, description, price, userUuid });
        await item.save();

        await request(app)
            .delete(`/api/items/${item.uuid}`)
            .set('Authorization', JWTGenerator(userUuid))
            .expect(204)
    });

    it('deleted item should not exist in the collection', async () => {
        const item = new Item({ title, subtitle, description, price, userUuid });
        await item.save();

        await request(app)
            .delete(`/api/items/${item.uuid}`)
            .set('Authorization', JWTGenerator(userUuid))
            .expect(204)

        await request(app)
            .delete(`/api/items/${item.uuid}`)
            .set('Authorization', JWTGenerator(userUuid))
            .expect(404)
    });

    it('publish an ItemDeleted event', async () => {
        const item = new Item({ title, subtitle, description, price, userUuid });
        await item.save();

        await request(app)
            .delete(`/api/items/${item.uuid}`)
            .set('Authorization', JWTGenerator(userUuid))
            .expect(204)

        expect(amqp.publish).toHaveBeenCalledWith(ItemDeletedPublisher, expect.any(Object));
    });
});