import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { v4 } from "uuid";

export class ReviewClass extends TimeStamps {
    @prop()
    userUuid!: string;

    @prop()
    itemUuid!: string;

    @prop()
    description!: string;

    //1-10
    @prop()
    rating!: number;

    @prop({ default: v4 })
    uuid!: string;
};

const Review = getModelForClass(ReviewClass);

export { Review };