import { BaseConsumer, EventList, OrderCompletedEvent, ServiceList } from "@relace/common";
import { orderCompletedController } from "../../controllers/consumers/order-completed.controller";
import { name } from "../exchange";

export class OrderCompletedConsumer extends BaseConsumer<OrderCompletedEvent> {
    readonly key = EventList.OrderCompleted;
    readonly exchange = ServiceList.Order;

    onMessage = orderCompletedController;
};