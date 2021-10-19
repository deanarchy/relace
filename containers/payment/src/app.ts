import express, { urlencoded } from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import { errorHandler, NotFoundError, verifyUser } from '@relace/common';
import cookieSession from 'cookie-session';
import { newPaymentRouter } from './routes/new.route';

const app = express();
app.set('trust proxy', true);
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(verifyUser);

//route handler
app.use(newPaymentRouter);

app.all('*', () => {
    throw new NotFoundError();
});
app.use(errorHandler);

export { app };