import { BadRequestError } from '@relace/common';
import { Request, Response } from 'express';

import { User } from '../models/user';

export const signinController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new BadRequestError('invalid email');
    };

    if (!await user.compare(password)) {
        throw new BadRequestError('invalid password');
    };

    const jwt = user.sign();

    req.session = { jwt };

    res.status(200).send({ jwt });
};