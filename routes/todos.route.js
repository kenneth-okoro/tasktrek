const express = require('express');
const todosRouter = express.Router();

const todosArr = [
  {
    id: 1,
    task: 'Create all Apis for TaskTrek',
    tags: ['NodeJS', 'JavaScript'],
    status: 'todo',
  },
  {
    id: 2,
    task: 'Create Frontend for TaskTrek',
    tags: ['ReactJS', 'JavaScript'],
    status: 'todo',
  },
  {
    id: 3,
    task: 'Deploy TaskTrek',
    tags: ['AWS', 'DevOps'],
    status: 'Not Started',
  },
];

todosRouter.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Data fetched successfully',
    data: todosArr,
  });
});

todosRouter.get('/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todosArr.find((t) => t.id === todoId);

  res.status(200).json({
    status: 200,
    message: 'Data fetched successfully',
    data: todo || {},
  });
});

todosRouter.post('/', (req, res) => {
  const todo = req.body;

  if (!todo.task) {
    return res.status(400).json({ message: 'Task is required', status: 400 });
  }
  if (!todo.tags) {
    return res.status(400).json({ message: 'Tags is required', status: 400 });
  }
  if (!todo.status) {
    return res.status(400).json({ message: 'Status is required', status: 400 });
  }

  const newTodo = {
    id: todosArr[todosArr.length - 1].id + 1,
    task: todo.task,
    tags: todo.tags,
    status: todo.status,
  };

  todosArr.push(newTodo);
  res.status(201).json(newTodo);
});

todosRouter.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todosArr.findIndex((t) => t.id === id);
  const updatedTodo = req.body;

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found', status: 404 });
  }

  todosArr[todoIndex] = { id: id, ...updatedTodo };

  res.status(200).json(todosArr[todoIndex]);
});

todosRouter.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todosArr.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found', status: 404 });
  }

  todosArr.splice(todoIndex, 1);

  res.status(200).json({ message: 'Todo deleted successfully', status: 200 });
});

module.exports = todosRouter;
