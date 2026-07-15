const { body, param } = require("express-validator");

const createTodoValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),
];

const updateTodoValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("completed")
    .isBoolean()
    .withMessage("Completed must be a boolean"),
];

const todoIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Invalid todo id"),
];

module.exports = {
  createTodoValidation,
  updateTodoValidation,
  todoIdValidation,
};