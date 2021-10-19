import request from 'supertest';
import { v4 } from 'uuid';

import { app } from '../../app';
import { Item } from '../../models/item';

describe('show item route test', () => {
    const title = 'test title';
    const subtitle = 'lorem ipsum';
    const description = 'lorem ipsum dolor sit';
    const price = 20;

    it('return 400 if the parameter are not proper', async () => {
        await request(app)
            .get(`/api/items/totally-not-uuid`)
            .expect(400)
    });

    it('return 404 if item not found', async () => {
        await request(app)
            .get(`/api/items/${v4()}`)
            .expect(404)
    });

    it('return 200 after successful request', async () => {
        const item = new Item({ title, subtitle, description, price, userUuid: v4() })
        await item.save();

        await request(app)
            .get(`/api/items/${item.uuid}`)
            .expect(200)
    });

    it('return a proper format after requesting', async () => {
        const item = new Item({ title, subtitle, description, price, userUuid: v4() })
        await item.save();

        const res = await request(app).get(`/api/items/${item.uuid}`);

        expect(res.body).toBeDefined();
    });
});