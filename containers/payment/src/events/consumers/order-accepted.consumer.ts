import { BaseConsumer, EventList, OrderAcceptedEvent, ServiceList } from "@relace/common";

import { orderAcceptedController } from "../../controllers/consumers/order-accepted.controller";


export class OrderAcceptedConsumer extends BaseConsumer<OrderAcceptedEvent> {
    readonly key = EventList.OrderAccepted;
    readonly exchange = ServiceList.Order;

    onMessage = orderAcceptedController;
};