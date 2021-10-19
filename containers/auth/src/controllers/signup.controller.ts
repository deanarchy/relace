import { BadRequestError } from "@relace/common";
import { Response, Request } from "express";

import { amqp } from "../events/amqp";
import { UserCreatedPublisher } from "../events/publishers/user-created.publisher";

import { User } from "../models/user";

export const signupController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (await User.exists({ email })) {
        throw new BadRequestError('email exist');
    };

    const user = new User({ email, password });
    await user.save();

    const jwt = user.sign();

    req.session = { jwt };

    await amqp.publish(UserCreatedPublisher, {
        id: user.id,
        email: user.email,
        uuid: user.uuid
    });

    res.status(201).send({ jwt });
};