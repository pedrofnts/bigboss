import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

const connect = async () => {
    const uri = await mongod.getUri();
    await mongoose.connect(uri);
};

const closeDataBase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};

const db = {
    connect,
    closeDataBase
};

export default db;

