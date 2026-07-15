import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTodos, createTodo, deleteTodo, updateTodo } from "./todoAPI";

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (
    {
      page = 1,
      limit = 10,
      search = null,
      completed = null,
      sort = "id",
      order = "desc",
    } = {},
    thunkAPI,
  ) => {
    try {
      return await getTodos({
        page,
        limit,
        search,
        completed,
        sort,
        order,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch todos",
      );
    }
  },
);

export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (todo, thunkAPI) => {
    try {
      return await createTodo(todo);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create todo",
      );
    }
  },
);

export const removeTodo = createAsyncThunk(
  "todo/removeTodo",
  async (id, thunkAPI) => {
    try {
      await deleteTodo(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete todo",
      );
    }
  },
);

export const editTodo = createAsyncThunk(
  "todo/editTodo",
  async ({ id, todo }, thunkAPI) => {
    try {
      await updateTodo(id, todo);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update todo",
      );
    }
  },
);

const initialState = {
  todos: [],
  currentPage: 1,
  totalPages: 1,
  totalTodos: 0,
  limit: 10,

  search: "",
  completed: "",
  sort: "id",
  order: "desc",

  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;

        state.todos = action.payload.todos;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalTodos = action.payload.totalTodos;
        state.limit = action.payload.limit;
`12`
        state.search = action.meta.arg?.search || "";
        state.completed = action.meta.arg?.completed || "";
        state.sort = action.meta.arg?.sort || "id";
        state.order = action.meta.arg?.order || "desc";

        state.error = null;
      })

      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addTodo.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeTodo.pending, (state) => {
        state.loading = true;
      })

      .addCase(removeTodo.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(removeTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(editTodo.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(editTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default todoSlice.reducer;
