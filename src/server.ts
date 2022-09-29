import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import routes from './routes';

const app = express();

/** Connect to Mongo */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Mongo connected successfully.');
        StartServer();
    })
    .catch((error) => Logging.error(error));

/** Only Start Server if Mongoose Connects */
const StartServer = () => {
    /** Log the request */
    app.use((req, res, next) => {
        /** Log the req */
        Logging.info(
            `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
        );

        res.on('finish', () => {
            /** Log the res */
            Logging.info(
                `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
            );
        });

        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    /** API Rules */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );

        if (req.method == 'OPTIONS') {
            res.header(
                'Access-Control-Allow-Methods',
                'PUT, POST, PATCH, DELETE, GET'
            );
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */

    app.use('/', routes);

    /** Healthcheck */
    app.get('/ping', (req, res, next) =>
        res.status(200).json({ hello: 'world' })
    );

    /** Error handling */
    app.use((req, res, next) => {
        const error = new Error('Not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message,
        });
    });

    http
        .createServer(app);

    
};

app.listen(config.server.port, () =>
    Logging.info(`Server is running on port ${config.server.port}`)
);

export default app;
