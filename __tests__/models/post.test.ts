import postModel, { PostDocument, IPost } from './../../src/models/Post';
import {
    connectDBForTesting,
    disconnectDBForTesting,
} from '../db';
import { faker } from '@faker-js/faker';

describe('User Model Testing', () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });

    afterAll(async () => {
        await postModel.collection.drop();
        await disconnectDBForTesting();
    });

    const postInput: IPost = {
        category: faker.commerce.department(),
        album: faker.commerce.productMaterial(),
        year: '2015',
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        assets: 'troca',
        author
    };

    const post = new postModel({ ...postInput });


    it('Should create a Post', async () => {

        const createPost = await post.save();

        expect(createPost).toBeDefined();
        expect(createPost.category).toBe(user.name);
        expect(createPost.album).toBe(user.nickname);
        expect(createPost.year).toBe(user.email);
        expect(createPost.title).toBe(user.password);
        expect(createPost.description).toBe(user.role);
        expect(createPost.assets).toStrictEqual(user.address);
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

        await userModel.updateOne({ _id: user._id }, { ...userUpdated });
        const fecthedUser = await userModel.findOne({ _id: user._id });

        expect(fecthedUser).toBeDefined();
        expect(fecthedUser).toMatchObject(userUpdated);
        expect(fecthedUser).not.toMatchObject(userInput);
    });

    it('Should delete user', async () => {
        await userModel.deleteOne({ _id: user._id });

        const fetchedUser = await userModel.findOne({ _id: user._id });

        expect(fetchedUser).toBeNull();
    });
});