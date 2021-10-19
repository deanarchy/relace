import { BaseConsumer, EventList, OrderCompletedEvent, ServiceList } from '@relace/common';
import { orderCompletedController } from '../../controllers/consumers/order-completed.controller';

export class OrderCompletedConsumer extends BaseConsumer<OrderCompletedEvent> {
    readonly exchange = ServiceList.Order;
    readonly key = EventList.OrderCompleted;

    onMessage = orderCompletedController;
};