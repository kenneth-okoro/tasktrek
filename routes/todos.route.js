const express = require('express');
const todosRouter = express.Router();

const Todo = require('../models/todos.model');

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

todosRouter.get('/', async (req, res) => {
  const todos = await Todo.find();

  res.status(200).json({
    status: 200,
    message: 'Data fetched successfully',
    data: todos,
  });
});

todosRouter.get('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  res.status(200).json({
    status: 200,
    message: 'Data fetched successfully',
    data: todo || {},
  });
});

todosRouter.post("/", async (req, res) => {
  try {
    const todo = req.body;

    if (!todo.task) {
      return res.status(400).json({ message: "Task is required", status: 400 });
    }

    if (!todo.tags) {
      return res.status(400).json({ message: "Tags is required", status: 400 });
    }

    if (!todo.status) {
      return res.status(400).json({ message: "Status is required", status: 400 });
    }

    const newTodo = new Todo({
      task: todo.task,
      tags: todo.tags,
      status: todo.status,
    });

    const result = await newTodo.save();

    return res.status(201).json(result);
  } catch (error) {
    console.error("Error creating todo:", error);

    return res.status(500).json({
      message: "Failed to create todo",
      status: 500,
    });
  }
});


todosRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task, tags, status } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { task, tags, status },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found", status: 404 });
    }

    return res.status(200).json(updatedTodo);
  } catch (error) {
    return res.status(400).json({
      message: "Invalid todo id",
      status: 400,
    });
  }
});

todosRouter.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo not found",
        status: 404,
      });
    }

    return res.status(200).json({
      message: "Todo deleted successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid todo id",
      status: 400,
    });
  }
});


module.exports = todosRouter;
