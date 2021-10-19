import { ItemDeletedEvent, NotFoundError } from "@relace/common";
import { Item } from "../../models/item";

export const itemDeletedController = async (data: ItemDeletedEvent['data']) => {
    try {
        const { uuid } = data;

        await Item.deleteOne({ uuid });

    } catch (e) {
        throw e;
    }
};