import express from 'express';
import { config } from './config'; // config.ts
import { routes } from './routes/routes';
import notFoundMiddleware from './middlewares/notFound.middleware';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
import { initializeApp } from 'firebase-admin/app';
import {credential} from "firebase-admin";

// const serviceAccount = require('/path/to/serviceAccountKey.json');
initializeApp({
    credential: credential.cert(config.google_credentials_path!),
    projectId: config.firebase_project_id,
});

const app = express();

// app.use(middleware);
app.use(express.json());

app.use(routes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export { app };