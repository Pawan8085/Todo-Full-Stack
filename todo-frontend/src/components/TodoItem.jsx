import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  editTodo,
  removeTodo,
  fetchTodos,
} from "../features/todos/todoSlice";

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);

  async function handleDelete() {
    try {
      await dispatch(removeTodo(todo.id)).unwrap();
      dispatch(fetchTodos());
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdate() {
    if (!title.trim()) return;

    try {
      await dispatch(
        editTodo({
          id: todo.id,
          todo: {
            title,
            completed,
          },
        })
      ).unwrap();

      dispatch(fetchTodos());
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCancel() {
    setTitle(todo.title);
    setCompleted(todo.completed);
    setIsEditing(false);
  }

  return (
    <li className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {isEditing ? (
        <>
          <div className="flex-1 space-y-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              Completed
            </label>
          </div>

          <div className="ml-4 flex gap-2">
            <button
              onClick={handleUpdate}
              className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Save
            </button>

            <button
              onClick={handleCancel}
              className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {todo.title}
            </h3>

            <p
              className={`mt-1 text-sm font-medium ${
                todo.completed
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {todo.completed ? "✅ Completed" : "⏳ Pending"}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;