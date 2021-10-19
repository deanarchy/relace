import { BaseConsumer, EventList, ReviewCreatedEvent, ServiceList } from "@relace/common";

import { reviewCreatedController } from "../../controllers/consumers/review-created.controller";

export class ReviewCreatedConsumer extends BaseConsumer<ReviewCreatedEvent> {
    readonly exchange = ServiceList.Review;
    readonly key = EventList.ReviewCreated;

    onMessage = reviewCreatedController;
};