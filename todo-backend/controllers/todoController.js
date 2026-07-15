const todoService = require("../services/todoService");

async function createTodo(req, res) {
  const { title } = req.body;

  const todo = await todoService.createTodo(title, req.user.id);

  res.status(201).json({
    message: "Todo created successfully",
    todo,
  });
}

async function getTodos(req, res) {
  const userId = req.user.id;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search?.trim() || "";

  const completed =
    req.query.completed === undefined ? null : req.query.completed === "true";

  const sort = req.query.sort ?? "id";
  const order = req.query.order ?? "desc";

  const data = await todoService.getTodos(
    userId,
    page,
    limit,
    search,
    completed,
    sort,
    order,
  );

  res.status(200).json(data);
}

async function getTodoById(req, res) {
  const { id } = req.params;

  const todo = await todoService.getTodoById(id, req.user.id);

  res.status(200).json({
    todo,
  });
}

async function updateTodo(req, res) {
  const { id } = req.params;

  const { title, completed } = req.body;

  const todo = await todoService.updateTodo(id, req.user.id, title, completed);

  res.status(200).json({
    message: "Todo updated successfully",
    todo,
  });
}

async function deleteTodo(req, res) {
  const { id } = req.params;

  await todoService.deleteTodo(id, req.user.id);

  res.status(200).json({
    message: "Todo deleted successfully",
  });
}

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
