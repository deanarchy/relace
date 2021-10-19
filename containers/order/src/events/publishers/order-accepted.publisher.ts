import { BasePublisher, EventList, OrderAcceptedEvent, ServiceList } from "@relace/common";


export class OrderAcceptedPublisher extends BasePublisher<OrderAcceptedEvent> {
    readonly key = EventList.OrderAccepted;
    readonly exchange = ServiceList.Order;
};