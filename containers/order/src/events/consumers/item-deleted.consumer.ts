import { BaseConsumer, EventList, ItemDeletedEvent, ServiceList } from "@relace/common";
import { itemDeletedController } from "../../controllers/consumers/item-deleted.controller";

export class ItemDeletedConsumer extends BaseConsumer<ItemDeletedEvent> {
    readonly exchange = ServiceList.Item;
    readonly key = EventList.ItemDeleted;

    onMessage = itemDeletedController;
};