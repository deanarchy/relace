import { BasePublisher, EventList, ServiceList, UserCreatedEvent } from "@relace/common";

export class UserCreatedPublisher extends BasePublisher<UserCreatedEvent> {
    readonly key = EventList.UserCreated;
    readonly exchange = ServiceList.Auth;
};