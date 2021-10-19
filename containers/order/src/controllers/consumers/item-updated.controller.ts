import { ItemUpdatedEvent, NotFoundError } from "@relace/common";

import { Item } from "../../models/item";

export const itemUpdatedController = async (data: ItemUpdatedEvent['data']) => {
    try {
        const { uuid, title, price } = data;

        const item = await Item.findOne({ uuid });

        if (!item) throw new NotFoundError();

        item.price = price;
        item.title = title;

        await item.save();

    } catch (e) {
        throw e;
    };
};