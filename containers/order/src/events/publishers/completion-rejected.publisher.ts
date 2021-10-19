import { BasePublisher, CompletionRejectedEvent, EventList, ServiceList } from "@relace/common";


export class CompletionRejectedPublisher extends BasePublisher<CompletionRejectedEvent> {
    readonly key = EventList.CompletionRejected;
    readonly exchange = ServiceList.Order;
};