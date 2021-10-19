import { BasePublisher, EventList, OrderIssuedEvent, ServiceList } from "@relace/common";


export class OrderIssuedPublisher extends BasePublisher<OrderIssuedEvent> {
    readonly key = EventList.OrderIssued;
    readonly exchange = ServiceList.Order;
};