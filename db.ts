import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export async function connectDBForTesting() {
    try {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri(), { dbName: 'verifyMASTER' });
    } catch (error) {
        console.log('DB connect error');
    }
}

export async function disconnectDBForTesting() {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log('DB disconnect error');
    }
}