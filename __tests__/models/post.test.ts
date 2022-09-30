import postModel, { IPost } from './../../src/models/Post';
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
        await postModel.collection.drop();
        await disconnectDBForTesting();
    });

    const postInput: IPost = {
        category: faker.commerce.department(),
        album: faker.commerce.productMaterial(),
        year: 2015,
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        assets: {
            offer: ['fra008, fra010'],
            want: ['ale007']
        },
        user: faker.database.mongodbObjectId(),
    };

    const post = new postModel({ ...postInput });


    it('Should create a Post', async () => {

        const createPost = await post.save();

        expect(createPost).toBeDefined();
        expect(createPost.category).toBe(post.category);
        expect(createPost.album).toBe(post.album);
        expect(createPost.year).toBe(post.year);
        expect(createPost.title).toBe(post.title);
        expect(createPost.description).toBe(post.description);
        expect(createPost.assets).toStrictEqual(post.assets);
        expect(createPost.user).toStrictEqual(post.user);
    });

    it('Should get a post by id', async () => {
        await post.save();
        const fetchedPost = await postModel.findOne({ _id: post._id });

        expect(fetchedPost).toBeDefined();
        expect(fetchedPost).toMatchObject(post._doc);
    });

    it('Should get all posts', async () => {
        await post.save();

        const posts = await postModel.find();

        expect(posts).toBeDefined();
    });


    it('Should update post', async () => {
        const postToUpdate = {
            category: faker.commerce.department(),
            album: faker.commerce.productMaterial(),
            year: 2018,
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            assets: {
                offer: ['bra007, fra010'],
                want: ['ira009']
            }
        };
        console.log(`Post Antigo: ${post}`);

        await postModel.updateOne({ _id: post._id }, { ...postToUpdate });
        const fetchedPost = await postModel.findOne({ _id: post._id });

        console.log(`Fetched: ${fetchedPost}`);
        

        expect(fetchedPost).toBeDefined();
        expect(fetchedPost?.category).toBe(postToUpdate.category);
        expect(fetchedPost?.album).toBe(postToUpdate.album);
        expect(fetchedPost?.year).toBe(postToUpdate.year);
        expect(fetchedPost?.title).toBe(postToUpdate.title);
        expect(fetchedPost?.description).toBe(postToUpdate.description);
        expect(fetchedPost?.assets).toStrictEqual(postToUpdate.assets);
        expect(fetchedPost?.user).toStrictEqual(post.user);
    });

    it('Should delete post', async () => {
        await postModel.deleteOne({ _id: post._id });

        const fetchedPost = await postModel.findOne({ _id: post._id });

        expect(fetchedPost).toBeNull();
    });
});