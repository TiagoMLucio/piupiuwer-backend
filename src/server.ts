import express, { application, request, response } from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

const logRequests = (
    request: { method: any; url: any },
    response: any,
    next: () => void
) => {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel);

    next();

    console.timeEnd(logLabel);
};

app.use(logRequests);

app.use(routes);

app.listen(3333, () => {
    console.log('🚀 Server started on port 3333!');
});
