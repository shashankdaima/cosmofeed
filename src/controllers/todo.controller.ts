import { Request, Response } from 'express';
import { todos, Todo } from '../models/todo.model';

function createTodo(req: Request, res: Response) {
  const { text } = req.body;
  const newTodo: Todo = {
    id: todos.length + 1,
    text,
    completed: false,
  };
  todos.push(newTodo);
  res.json(newTodo);
}

function showTodos(req: Request, res: Response) {
  res.json(todos);
}

export { createTodo, showTodos };