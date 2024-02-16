import express from 'express';
import { config } from './config'; // config.ts
import { routes } from './routes/routes';
import notFoundMiddleware from './middlewares/notFound.middleware';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
const app = express();

// app.use(middleware);
app.use(express.json());
app.use(routes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export { app };