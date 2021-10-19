import { NotFoundError, requireAuth } from '@relace/common';
import Express, { Request, Response } from 'express';

import { Account } from '../models/account';

const router = Express.Router();

router.get('/api/accounts/me', requireAuth, async (req: Request, res: Response) => {
    const account = await Account.findOne({ uuid: req.user!.uuid });

    if (!account) throw new NotFoundError();

    res.send(account);
});

export { router as myAccountRouter };