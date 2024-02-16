import express from 'express';
import { config } from './config'; // config.ts
import { routes } from './routes/routes';
// import { middleware } from './middleware'; // middleware.ts

const app = express();

// app.use(middleware);
app.use(express.json());
app.use(routes);

export { app };