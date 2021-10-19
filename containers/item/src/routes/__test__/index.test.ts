import request from 'supertest';
import { v4 } from 'uuid';

import { app } from '../../app';
import { Item } from '../../models/item';

describe('index item route test', () => {
    const title = 'test title';
    const subtitle = 'lorem ipsum';
    const description = 'lorem ipsum dolor sit';
    const price = 20;

    const route = '/api/items';
    const n = 20;

    beforeEach(async () => {
        for (let i = 0; i < n; i++) {
            const item = new Item({ title, subtitle, description, price, userUuid: v4() })
            await item.save();
        };
    });

    it('return 200 after successful request', async () => {
        await request(app)
            .get(route)
            .expect(200)
    });

    it('return a proper format after requesting', async () => {
        const res = await request(app).get(route);
        
        expect(res.body.length).toBe(n);
    });
});