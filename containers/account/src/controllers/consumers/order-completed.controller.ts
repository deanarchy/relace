import { OrderCompletedEvent } from "@relace/common";
import { Message } from "amqplib";
import { Account } from "../../models/account";

export const orderCompletedController = async (data: OrderCompletedEvent['data'], msg: Message) => {
    try {
        const { item } = data;

        const account = await Account.findOne({ uuid: item.userUuid });

        if(!account) throw new Error("account not found");

        account.balance += item.price;
        await account.save();

    } catch (e) {
        throw e;
    }
};