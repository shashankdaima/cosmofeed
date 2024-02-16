import express from 'express';
import { createTodo, showTodos } from '../controllers/todo.controller';

const router = express.Router();

router.post('/create', createTodo);
router.get('/show', showTodos);

export { router as todoRouter };