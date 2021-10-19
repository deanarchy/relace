import { BasePublisher, EventList, OrderCancelledEvent, ServiceList } from "@relace/common"


export class OrderCancelledPublisher extends BasePublisher<OrderCancelledEvent> {
    readonly key = EventList.OrderCancelled;
    readonly exchange = ServiceList.Order;
};