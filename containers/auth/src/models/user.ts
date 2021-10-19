import { prop, getModelForClass, pre, DocumentType, modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';

import { Password } from '../utils/password.util';

@pre<UserClass>('save', async function () {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    };
})
class UserClass extends TimeStamps {
    @prop({ unique: true })
    public email!: string;

    @prop()
    public password!: string;

    @prop({ default: v4 })
    public uuid!: string;

    public async compare(this: DocumentType<UserClass>, password: string) {
        return Password.compare(this.password, password);
    };

    public sign(this: DocumentType<UserClass>) {
        return jwt.sign({
            id: this.id,
            email: this.email,
            uuid: this.uuid
        }, process.env.JWT_KEY!, { expiresIn: '2h' });
    };

};

const User = getModelForClass(UserClass);

export { User };