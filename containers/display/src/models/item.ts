import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { v4 } from 'uuid';

import { ReviewClass } from "./review";

class ItemClass extends TimeStamps {
    @prop()
    title!: string;

    @prop()
    subtitle!: string;

    @prop()
    description!: string;

    @prop()
    price!: number;

    @prop()
    userUuid!: string;

    @prop({ default: v4 })
    uuid!: string;

    @prop()
    reviews?: ReviewClass[];
};

const Item = getModelForClass(ItemClass);

export { Item };