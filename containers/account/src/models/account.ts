import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

class AccountClass extends TimeStamps {
    @prop({ unique: true })
    public email!: string;

    @prop()
    public firstName?: string;

    @prop()
    public lastName?: string;

    @prop({ default: 0 })
    public balance!: number;

    @prop()
    public phone?: string;

    @prop()
    public address?: string;

    @prop()
    public uuid!: string;

};

const Account = getModelForClass(AccountClass);

export { Account };