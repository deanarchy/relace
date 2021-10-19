import { BaseConsumer, EventList, ItemCreatedEvent, ServiceList } from "@relace/common";

import { itemCreatedController } from "../../controllers/consumers/item-created.controller";


export class ItemCreatedConsumer extends BaseConsumer<ItemCreatedEvent> {
    readonly key = EventList.ItemCreated;
    readonly exchange = ServiceList.Item;

    onMessage = itemCreatedController;
};