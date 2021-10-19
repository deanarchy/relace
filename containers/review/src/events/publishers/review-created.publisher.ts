import { BasePublisher, EventList, ReviewCreatedEvent, ServiceList } from "@relace/common"

export class ReviewCreatedPublisher extends BasePublisher<ReviewCreatedEvent> {
    readonly exchange = ServiceList.Review;
    readonly key = EventList.ReviewCreated;
};