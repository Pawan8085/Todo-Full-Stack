const express = require("express");
const todoController = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");


const {
  createTodoValidation,
  updateTodoValidation,
  todoIdValidation,
} = require("../validations/todoValidation");
const paginationValidation = require("../validations/paginationValidation")

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  createTodoValidation,
  validationMiddleware,
  todoController.createTodo
);

router.get(
  "/:id",
  todoIdValidation,
  validationMiddleware,
  todoController.getTodoById
);

router.put(
  "/:id",
  todoIdValidation,
  updateTodoValidation,
  validationMiddleware,
  todoController.updateTodo
);

router.delete(
  "/:id",
  todoIdValidation,
  validationMiddleware,
  todoController.deleteTodo
);

router.get(
    "/", 
    paginationValidation,
    validationMiddleware,
    todoController.getTodos
);

module.exports = router;