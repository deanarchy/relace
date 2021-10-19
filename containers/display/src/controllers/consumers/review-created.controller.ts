import { NotFoundError, ReviewCreatedEvent } from "@relace/common";

import { Item } from "../../models/item";
import { Review } from "../../models/review";

export const reviewCreatedController = async (data: ReviewCreatedEvent['data']) => {
    try {
        const { uuid, itemUuid, userUuid, description, rating } = data;

        const item = await Item.findOne({ uuid: itemUuid });

        if (!item) throw new NotFoundError();

        const review = new Review({ userUuid, uuid, description, rating });
        await review.save();

        item.reviews?.push(review);
        await item.save();

    } catch (e) {
        throw e;
    }
};