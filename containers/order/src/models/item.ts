import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class ItemClass extends TimeStamps {
    @prop()
    title!: string;

    @prop()
    price!: number;

    @prop()
    userUuid!: string;

    @prop()
    uuid!: string;
};

const Item = getModelForClass(ItemClass);

export { Item };