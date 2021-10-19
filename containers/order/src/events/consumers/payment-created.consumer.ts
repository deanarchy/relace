import { BaseConsumer, EventList, PaymentCreatedEvent, ServiceList } from "@relace/common";

import { paymentCreatedController } from "../../controllers/consumers/payment-created.controller";


export class PaymentCreatedConsumer extends BaseConsumer<PaymentCreatedEvent> {
    readonly key = EventList.PaymentCreated;
    readonly exchange = ServiceList.Payment;

    onMessage = paymentCreatedController;
};