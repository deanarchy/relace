import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

jest.mock('../events/amqp')

process.env.STRIPE_KEY = 'rk_test_51ISx7cGWDxQj4eMPuLYpcZm0KwtpFUCxVJVioIoI7xnkWqPRGrYxWENuKOnezenyQuOMvzsVaEo2Q83XXe1HHiqS00Vg3hkdCV'

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'testing-string-key';

    mongo = await MongoMemoryServer.create();
    const mongoURI = mongo.getUri();

    await mongoose.connect(mongoURI), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    };
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});
