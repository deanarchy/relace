import { BasePublisher, EventList, ItemDeletedEvent, ServiceList } from "@relace/common";


export class ItemDeletedPublisher extends BasePublisher<ItemDeletedEvent> {
    readonly key = EventList.ItemDeleted;
    readonly exchange = ServiceList.Item;
};