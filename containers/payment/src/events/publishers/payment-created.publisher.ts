import { BasePublisher, EventList, PaymentCreatedEvent, ServiceList } from "@relace/common";


export class PaymentCreatedPublisher extends BasePublisher<PaymentCreatedEvent> {
    readonly key = EventList.PaymentCreated;
    readonly exchange = ServiceList.Payment;
};