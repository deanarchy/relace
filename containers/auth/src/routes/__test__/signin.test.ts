import request from 'supertest';

import { app } from '../../app';
import { User } from "../../models/user";

describe('signin route test', () => {
    const email = "testing123@test.com";
    const password = "testing123456789";
    const route = '/api/auth/signin';

    beforeEach(async () => {
        await new User({ email, password }).save();
    });

    it('return 200 after a successful signin', async () => {
        await request(app)
            .post(route)
            .send({ email, password })
            .expect(200)
    });

    it('return 400 for an invalid credentials', async () => {
        await request(app)
            .post(route)
            .expect(400)

        await request(app)
            .post(route)
            .send({ email: 'ajsdisdj@sdjsd.com', password })
            .expect(400)

        await request(app)
            .post(route)
            .send({ email, password: 'wrong password' })
            .expect(400)

    });

    it('set a cookie after successful signin', async () => {
        const res = await request(app)
            .post(route)
            .send({ email, password })

        expect(res.get('Set-Cookie')).toBeDefined();
    });
});