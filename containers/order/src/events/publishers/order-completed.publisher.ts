import { BasePublisher, EventList, OrderCompletedEvent, ServiceList } from "@relace/common"


export class OrderCompletedPublisher extends BasePublisher<OrderCompletedEvent> {
    readonly key = EventList.OrderCompleted;
    readonly exchange = ServiceList.Order;
};