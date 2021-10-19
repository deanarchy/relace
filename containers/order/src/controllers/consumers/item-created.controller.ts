import { ItemCreatedEvent } from "@relace/common";
import { Message } from "amqplib";

import { Item } from "../../models/item";

export const itemCreatedController = async (data: ItemCreatedEvent['data'], msg: Message) => {
    try {
        const { uuid, title, price, userUuid } = data;

        const item = new Item({ uuid, title, price, userUuid });
        await item.save();
        
    } catch (e) {
        throw e;
    };

};