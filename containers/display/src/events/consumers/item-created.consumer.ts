import { BaseConsumer, EventList, ItemCreatedEvent, ServiceList } from "@relace/common";
import { itemCreatedController } from "../../controllers/consumers/item-created.controller";

export class ItemCreatedConsumer extends BaseConsumer<ItemCreatedEvent> {
    readonly exchange = ServiceList.Item;
    readonly key = EventList.ItemCreated;

    onMessage = itemCreatedController;
};