import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, fetchTodos } from "../features/todos/todoSlice";

function TodoForm() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await dispatch(addTodo({ title })).unwrap();

      setTitle("");

      dispatch(fetchTodos());
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
      <input
        type="text"
        placeholder="Enter todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 rounded border p-2"
      />

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;