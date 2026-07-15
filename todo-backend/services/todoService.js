const todoModel = require("../models/todoModel");
const AppError = require("../utils/AppError");

async function createTodo(title, userId) {
  const todoId = await todoModel.createTodo(title, userId);

  return {
    id: todoId,
    title,
    completed: false,
  };
}

async function getTodos(userId, page, limit, search, completed, sort, order) {
    
  const offset = (page - 1) * limit;

  const todos = await todoModel.getTodosByUserId(
    userId,
    limit,
    offset,
    search,
    completed,
    sort,
    order,
  );

  const totalTodos = await todoModel.getTotalTodos(userId, search, completed);

  return {
    currentPage: page,
    limit,
    totalTodos,
    totalPages: Math.ceil(totalTodos / limit),
    todos,
  };
}

async function getTodoById(todoId, userId) {
  const todo = await todoModel.getTodoById(todoId, userId);

  if (!todo) {
    throw new AppError("Todo not found", 404);
  }

  return todo;
}

async function updateTodo(todoId, userId, title, completed) {
  const affectedRows = await todoModel.updateTodo(
    todoId,
    userId,
    title,
    completed,
  );

  if (affectedRows === 0) {
    throw new AppError("Todo not found", 404);
  }

  return {
    id: Number(todoId),
    title,
    completed,
  };
}

async function deleteTodo(todoId, userId) {
  const affectedRows = await todoModel.deleteTodo(todoId, userId);

  if (affectedRows === 0) {
    throw new AppError("Todo not found", 404);
  }
}

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
