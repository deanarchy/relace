import { JWTGenerator } from '@relace/common';
import request from 'supertest';
import { v4 } from 'uuid';

import { app } from '../../app';
import { amqp } from '../../events/amqp';
import { ReviewCreatedPublisher } from '../../events/publishers/review-created.publisher';
import { Order } from '../../models/order';

describe('new review controller test', () => {
    const itemUuid = v4();
    const rating = 8;
    const customerUuid = v4();
    const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis vehicula dapibus. Vestibulum at euismod nunc. Proin vel blandit tellus, sed volutpat tellus. Aliquam tincidunt arcu enim, in sagittis metus sagittis eu. Proin eros metus, laoreet vitae hendrerit a, fringilla at metus. Nunc ultrices sodales lacus sit amet egestas. Vestibulum dolor orci, ullamcorper et ligula ut, facilisis dictum lacus. Sed auctor rhoncus nibh, ut pharetra erat viverra et. Mauris finibus fermentum leo sodales volutpat. Nulla facilisi. Sed semper sem mauris, nec ultrices mauris tempus vitae.'

    it('customer can only post review after they successfully order the item', async () => {
        await request(app)
            .post(`/api/items/${itemUuid}/reviews`)
            .send({ rating, description })
            .set('Authorization', JWTGenerator(customerUuid))
            .expect(401)
    });

    it('return 201 after successful review', async () => {
        const order = new Order({ userUuid: customerUuid, uuid: v4() });
        await order.save();

        await request(app)
            .post(`/api/items/${itemUuid}/reviews`)
            .send({ rating, description })
            .set('Authorization', JWTGenerator(customerUuid))
            .expect(201)
    });

    it('publish ReviewCreated event after successful review', async () => {
        const order = new Order({ userUuid: customerUuid, uuid: v4() });
        await order.save();

        await request(app)
            .post(`/api/items/${itemUuid}/reviews`)
            .send({ rating, description })
            .set('Authorization', JWTGenerator(customerUuid))
            .expect(201)

        expect(amqp.publish).toBeCalledWith(ReviewCreatedPublisher, expect.any(Object));
    });
});