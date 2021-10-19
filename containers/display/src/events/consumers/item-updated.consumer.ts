import { BaseConsumer, EventList, ItemUpdatedEvent, ServiceList } from "@relace/common";

import { itemUpdatedController } from "../../controllers/consumers/item-updated.controller";

export class ItemUpdatedConsumer extends BaseConsumer<ItemUpdatedEvent> {
    readonly exchange = ServiceList.Item;
    readonly key = EventList.ItemUpdated;

    onMessage = itemUpdatedController;
};