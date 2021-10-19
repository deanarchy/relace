import { UserCreatedEvent } from "@relace/common";
import { Message } from "amqplib";

import { Account } from "../../models/account";


export const userCreatedController = async (data: UserCreatedEvent['data'], msg: Message) => {
    try {
        const account = new Account({
            email: data.email,
            uuid: data.uuid
        });

        await account.save();

        
    } catch (e) {
        throw e;
    }
};