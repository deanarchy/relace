import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

class PaymentClass extends TimeStamps {
    @prop()
    orderUuid!: string;

    @prop()
    stripeId!: string;
};

const Payment = getModelForClass(PaymentClass);

export { Payment };