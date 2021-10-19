import { OrderStatus } from "@relace/common";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

class OrderClass extends TimeStamps {
    @prop()
    userUuid!: string;

    @prop({ enum: Object.values(OrderStatus), default: OrderStatus.AwaitingPayment })
    status!: string;

    @prop()
    price!: number;

    @prop()
    uuid!: string;
};

const Order = getModelForClass(OrderClass);

export { Order };