import { OrderCompletedEvent } from "@relace/common";
import { Order } from "../../models/order";

export const orderCompletedController = async (data: OrderCompletedEvent['data']) => {
    const order = new Order({ uuid: data.uuid, userUuid: data.userUuid });
    await order.save();
};