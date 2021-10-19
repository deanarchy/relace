import express, { urlencoded } from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import { errorHandler, NotFoundError, verifyUser } from '@relace/common';
import cookieSession from 'cookie-session';

import { newOrderRouter } from './routes/new.route';
import { rejectOrderRouter } from './routes/confirm/reject.route';
import { acceptOrderRouter } from './routes/confirm/accept.route';
import { acceptCompletionRouter } from './routes/completion/accept.route';
import { rejectCompletionRouter } from './routes/completion/reject.route';
import { newCompletionRouter } from './routes/completion/new.route';
import { indexOrderRouter } from './routes/index.route';

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
app.use(indexOrderRouter);
app.use(newOrderRouter);

app.use(acceptOrderRouter);
app.use(rejectOrderRouter);

app.use(newCompletionRouter);
app.use(acceptCompletionRouter);
app.use(rejectCompletionRouter);

app.all('*', () => {
    throw new NotFoundError();
});
app.use(errorHandler);

export { app };