import { BaseConsumer, EventList, ServiceList, UserCreatedEvent } from "@relace/common";

import { userCreatedController } from "../../controllers/consumers/user-created.controller";

//TODO: TEST THIS
export class UserCreatedConsumer extends BaseConsumer<UserCreatedEvent> {
    readonly key = EventList.UserCreated;
    readonly exchange = ServiceList.Auth;

    onMessage = userCreatedController;
};