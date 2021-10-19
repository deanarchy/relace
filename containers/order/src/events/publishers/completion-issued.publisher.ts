import { BasePublisher, CompletionIssuedEvent, EventList, ServiceList } from "@relace/common";


export class CompletionIssuedPublisher extends BasePublisher<CompletionIssuedEvent> {
    readonly key = EventList.CompletionIssued;
    readonly exchange = ServiceList.Order;
};