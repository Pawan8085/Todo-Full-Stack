import api from "../../services/axios";


export const getTodos = async (params) => {
  const response = await api.get("/todos", {
    params,
  });

  return response.data;
};

export const createTodo = async (todo) => {
  const response = await api.post("/todos", todo);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await api.put(`/todos/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};