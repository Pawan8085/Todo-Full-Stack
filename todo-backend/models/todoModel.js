const db = require("../config/db");

async function createTodo(title, userId) {
  const [result] = await db.query(
    `
    INSERT INTO todos(title, user_id)
    VALUES(?, ?)
    `,
    [title, userId],
  );

  return result.insertId;
}

async function getTodosByUserId(
  userId,
  limit,
  offset,
  search,
  completed,
  sort,
  order,
) {
  const allowedSortFields = ["id", "title", "completed", "created_at"];
  const allowedOrders = ["asc", "desc"];

  sort = allowedSortFields.includes(sort) ? sort : "id";
  order = allowedOrders.includes(order.toLowerCase())
    ? order.toUpperCase()
    : "DESC";

  let sql = `
    SELECT id, title, completed, created_at
    FROM todos
    WHERE user_id = ?
    AND title LIKE ?
  `;

  const values = [userId, `%${search}%`];

  if (completed !== null) {
    sql += ` AND completed = ?`;
    values.push(completed);
  }

  sql += `
    ORDER BY ${sort} ${order}
    LIMIT ? OFFSET ?
  `;

  values.push(limit, offset);

  const [rows] = await db.query(sql, values);

  return rows;
}

async function getTotalTodos(userId, search, completed) {
  let sql = `
    SELECT COUNT(*) AS total
    FROM todos
    WHERE user_id = ?
    AND title LIKE ?
  `;

  const values = [userId, `%${search}%`];

  if (completed !== null) {
    sql += " AND completed = ?";
    values.push(completed);
  }

  const [rows] = await db.query(sql, values);

  return rows[0].total;
}

async function getTodoById(todoId, userId) {
  const [rows] = await db.query(
    `
    SELECT id, title, completed
    FROM todos
    WHERE id = ? AND user_id = ?
    `,
    [todoId, userId],
  );

  return rows[0];
}

async function updateTodo(todoId, userId, title, completed) {
  const [result] = await db.query(
    `
    UPDATE todos
    SET title = ?, completed = ?
    WHERE id = ? AND user_id = ?
    `,
    [title, completed, todoId, userId],
  );

  return result.affectedRows;
}

async function deleteTodo(todoId, userId) {
  const [result] = await db.query(
    `
        DELETE FROM todos 
        where id = ? AND user_id = ?
        `,
    [todoId, userId],
  );
  return result.affectedRows;
}
module.exports = {
  createTodo,
  getTodosByUserId,
  getTodoById,
  updateTodo,
  deleteTodo,
  getTotalTodos,
};
