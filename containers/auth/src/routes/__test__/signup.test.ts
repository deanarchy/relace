import request from 'supertest';

import { app } from '../../app';
import { amqp } from '../../events/amqp';

describe('signup route test', () => {
    const email = "testing123@test.com";
    const password = "testing123456789";
    const route = '/api/auth/signup'

    it('get a 201 status code on successful signup', async () => {
        const res = await request(app)
            .post(route)
            .send({ email, password })
            .expect(201)
    });

    it('get a 400 status code on existing email', async () => {
        await request(app)
            .post(route)
            .send({ email, password })

        await request(app)
            .post(route)
            .send({ email, password })
            .expect(400)
    });

    it('set a cookie after successful signup', async () => {
        const res = await request(app)
            .post(route)
            .send({ email, password })

        expect(res.get('Set-Cookie')).toBeDefined();
    });

    it('publish a UserCreated event', async () => {
        await request(app)
            .post(route)
            .send({ email, password })        
        
        expect(amqp.publish).toHaveBeenCalled();
    });
});