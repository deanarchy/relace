import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

class OrderClass extends TimeStamps {
    @prop()
    userUuid!: string;

    @prop()
    uuid!: string;
};

const Order = getModelForClass(OrderClass);

export { Order };