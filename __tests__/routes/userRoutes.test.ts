import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    jest,
} from '@jest/globals';
import request from 'supertest';
import app from '../../src/server';
import {authMiddleware} from '../../src/middlewares/auth';
import { Request, Response, NextFunction } from 'express';
import express from 'express';

jest.mock('./authMiddleware', () => jest.fn((req: Request, res: Response, next: NextFunction) => next()));
let agent;
let server;
beforeEach(async () => {
    const port = process.env.SERVER_PORT;
    server = app.listen(port);
});

afterEach(async () => {
    server.close();
});

describe('GET in /users', () => {
    it('Should return users list', async () => {
        const response = await request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200);
    });
});