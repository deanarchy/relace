import mongoose from 'mongoose';

import { app } from './app';
import { amqp } from './events/amqp';
import { OrderCompletedConsumer } from './events/consumers/order-completed.consumer';

const start = async () => {
    const PORT = 3000;

    if (!process.env.JWT_KEY) {
        throw new Error('Secret key not found');
    };

    if (!process.env.DB_URI) {
        throw new Error('DB URI must be defined');
    };

    if (!process.env.AMQP_URL) {
        throw new Error('AMQP URL must be defined');
    };

    if (!process.env.STRIPE_KEY) {
        throw new Error('STRIPE KEY must be provided');
    };

    try {
        await amqp.init(process.env.AMQP_URL);

        amqp.client.on('close', () => {
            console.log('connection closed to RabbitMQ');
            process.exit();
        });

        process.on('SIGINT', () => amqp.client.close());
        process.on('SIGTERM', () => amqp.client.close());

        await amqp.subscribe(OrderCompletedConsumer);

        await mongoose.connect(process.env.DB_URI);
        console.log('connected to MongoDB');

    } catch (err) {
        console.error(err);
    };

    app.listen(PORT, () => {
        console.log(process.env.npm_package_name, "service started on port", PORT);
    });

};

start();