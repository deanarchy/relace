import { User } from "../user";

it('user model has to be defined', async () => {
    const user = new User({
        email: 'test@test.com',
        password: 'test123'
    });

    await user.save();    

    expect(user.email).toBeDefined();
    expect(user.password).toBeDefined();
    expect(user.uuid).toBeDefined();
    expect(user.createdAt).toBeDefined();
});

it('user password can be compared', async () => {
    const email = 'test@test.com';
    const password = 'testing123';

    await new User({
        email,
        password,
    }).save();

    const user = await User.findOne({
        email
    });

    if(user == null) {
        throw new Error();
    };

    expect(await user.compare("testing321")).toBe(false);
    expect(await user.compare("testing123")).toBe(true);
});