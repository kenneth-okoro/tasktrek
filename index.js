const express = require('express');
const app = express();

const { PORT } = require('./config/env');
const morgan = require('morgan');
const helmet = require('helmet');

const todosRouter = require('./routes/todos.route');

// Middleware
app.use(helmet()); // for security headers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/avatar', express.static('public'));
app.use(morgan('dev')); // for logging

// Routes
app.use('/api/todos', todosRouter);

// Custom Middleware

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
