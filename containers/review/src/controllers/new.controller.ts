import { UnauthorizedError } from "@relace/common";
import { Request, Response } from "express";

import { amqp } from "../events/amqp";
import { ReviewCreatedPublisher } from "../events/publishers/review-created.publisher";
import { Order } from "../models/order";
import { Review } from "../models/review";

export const newReviewController = async (req: Request, res: Response) => {
    const { rating, description } = req.body;


    if (!await Order.exists({ userUuid: req.user!.uuid })) {
        throw new UnauthorizedError();
    };

    const review = new Review({
        rating, description,
        userUuid: req.user!.uuid,
        itemUuid: req.params.id
    });
    await review.save();

    await amqp.publish(ReviewCreatedPublisher, {
        userUuid: review.userUuid,
        itemUuid: review.itemUuid,
        description: review.description,
        rating: review.rating,
        uuid: review.uuid
    });

    res.status(201).send(review);
};