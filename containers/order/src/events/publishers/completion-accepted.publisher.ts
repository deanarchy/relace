import { BasePublisher, CompletionAcceptedEvent, EventList, ServiceList } from "@relace/common";


export class CompletionAcceptedPublisher extends BasePublisher<CompletionAcceptedEvent> {
    readonly key = EventList.CompletionAccepted;
    readonly exchange = ServiceList.Order;
};