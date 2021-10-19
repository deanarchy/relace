import { BasePublisher, EventList, ItemUpdatedEvent, ServiceList } from "@relace/common";


export class ItemUpdatedPublisher extends BasePublisher<ItemUpdatedEvent> {
    readonly key = EventList.ItemUpdated;
    readonly exchange = ServiceList.Item;
};