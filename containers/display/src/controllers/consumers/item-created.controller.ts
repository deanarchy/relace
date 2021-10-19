import { ItemCreatedEvent } from "@relace/common";

import { Item } from "../../models/item";

export const itemCreatedController = async (data: ItemCreatedEvent['data']) => {
    try {
        const item = new Item();
        Object.assign(item, data)

        await item.save();

    } catch (e) {
        throw e;
    }
};