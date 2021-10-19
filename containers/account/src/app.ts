import express from 'express';
import 'express-async-errors'
import { json, urlencoded } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, verifyUser } from '@relace/common';

import { myAccountRouter } from './routes/me.route';

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
app.use(myAccountRouter);


app.all('*', () => {
    throw new NotFoundError();
});
app.use(errorHandler);

export { app };