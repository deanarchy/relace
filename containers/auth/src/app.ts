import express, { urlencoded } from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, verifyUser } from '@relace/common';

import { signupRouter } from './routes/signup.route';
import { signinRouter } from './routes/signin.route';
import { signoutRouter } from './routes/signout.route';

const app = express();
app.set('trust proxy', true);
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieSession({
    signed: false,
    sameSite: 'none',
    secure: process.env.NODE_ENV !== 'test',
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(verifyUser);


app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', () => {
    throw new NotFoundError();
});
app.use(errorHandler);

export { app };