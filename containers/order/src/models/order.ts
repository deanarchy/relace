import { OrderStatus } from "@relace/common";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { v4 } from "uuid";

import { ItemClass } from "./item";

class OrderClass extends TimeStamps {
    @prop()
    userUuid!: string;

    @prop({ enum: Object.values(OrderStatus), default: OrderStatus.Pending })
    status!: string;

    @prop({ ref: () => ItemClass })
    item!: Ref<ItemClass>;

    @prop({ default: v4 })
    uuid!: string;

};

const Order = getModelForClass(OrderClass);

export { Order };