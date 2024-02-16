import express from 'express';
import { config } from './config'; // config.ts
// import { routes } from './routes'; // routes.ts
// import { middleware } from './middleware'; // middleware.ts

const app = express();

// app.use(middleware);
// app.use(routes);

export { app };