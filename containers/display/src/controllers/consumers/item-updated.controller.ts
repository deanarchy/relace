import { ItemUpdatedEvent, NotFoundError } from "@relace/common";
import { Item } from "../../models/item";

export const itemUpdatedController = async (data: ItemUpdatedEvent['data']) => {
    try {
        const { uuid } = data;

        const item = await Item.findOne({ uuid });

        if (!item) throw new NotFoundError();

        Object.assign(item, data)
        await item.save();

    } catch (e) {
        throw e;
    }
};