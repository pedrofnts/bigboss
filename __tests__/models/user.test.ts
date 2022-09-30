import userModel, { IUser } from './../../src/models/User';
import {
    connectDBForTesting,
    disconnectDBForTesting,
} from '../../db';
import { faker } from '@faker-js/faker';

describe('User Model Testing', () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });

    afterAll(async () => {
        await userModel.collection.drop();
        await disconnectDBForTesting();
    });

    const userInput: IUser = {
        name: faker.name.firstName(),
        nickname: faker.name.suffix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'user',
        address: {
            street: faker.address.street(),
            number: faker.random.numeric(),
            city: faker.address.cityName(),
            state: faker.address.stateAbbr(),
            country: faker.address.countryCode()
        }
    };

    const user = new userModel({ ...userInput });
    

    it('Should create a User', async () => {

        const createUser = await user.save();

        expect(createUser).toBeDefined();
        expect(createUser.name).toBe(user.name);
        expect(createUser.nickname).toBe(user.nickname);
        expect(createUser.email).toBe(user.email);
        expect(createUser.password).toBe(user.password);
        expect(createUser.role).toBe(user.role);
        expect(createUser.address).toStrictEqual(user.address);
    });

    it('Should get all users' , async() => {
        await user.save();

        const users = await userModel.find();

        expect(users).toBeDefined();
    });

    it('Should get a user by id', async () => {

        await user.save();
        const fetchedUser = await userModel.findOne({ _id: user._id });
        
        expect(fetchedUser).toBeDefined();
        expect(fetchedUser).toMatchObject(userInput);
    });


    it('Should update user', async () => {
        const userUpdated: IUser = {
            name: faker.name.firstName(),
            nickname: faker.name.suffix(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: 'user',
            address: {
                street: faker.address.street(),
                number: faker.random.numeric(),
                city: faker.address.cityName(),
                state: faker.address.stateAbbr(),
                country: faker.address.countryCode()
            }
        };

        await userModel.updateOne({_id: user._id}, {...userUpdated});
        const fecthedUser = await userModel.findOne({ _id: user._id });
      
        expect(fecthedUser).toBeDefined();
        expect(fecthedUser).toMatchObject(userUpdated);
        expect(fecthedUser).not.toMatchObject(userInput);
    });

    it('Should delete user', async () => {
        await userModel.deleteOne({_id: user._id});

        const fetchedUser = await userModel.findOne({_id: user._id});

        expect(fetchedUser).toBeNull();
    });
});