import express from 'express';
import { helloRouter } from './hello.route';
import { todoRouter } from './todo.route';
const router = express.Router();

router.use('/hello', helloRouter);
router.use('/todo', todoRouter);
export { router as routes };