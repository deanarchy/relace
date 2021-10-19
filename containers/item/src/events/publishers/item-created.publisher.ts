import { BasePublisher, EventList, ItemCreatedEvent, ServiceList } from "@relace/common";


export class ItemCreatedPublisher extends BasePublisher<ItemCreatedEvent> {
    readonly key = EventList.ItemCreated;
    readonly exchange = ServiceList.Item;
};