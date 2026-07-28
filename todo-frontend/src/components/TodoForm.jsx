import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Button } from "antd";
import { toast } from "react-toastify";
import { addTodo, fetchTodos } from "../features/todos/todoSlice";

function TodoForm({ onClose }) {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a todo title");
      return;
    }

    try {
      await dispatch(addTodo({ title })).unwrap();

      toast.success("Todo created successfully");

      setTitle("");

      dispatch(fetchTodos());

      onClose();
    } catch (error) {
      toast.error(error || "Failed to create todo");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Enter todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        size="large"
      />

      <div className="mt-5 flex justify-end gap-3">
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          type="primary"
          htmlType="submit"
        >
          Create Todo
        </Button>
      </div>
    </form>
  );
}

export default TodoForm;