import { useEffect, useState } from "react";
import { Modal, Input, Switch, Button } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  editTodo,
  fetchTodos,
} from "../features/todos/todoSlice";

function EditTodoModal({ open, todo, onClose }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setCompleted(todo.completed);
    }
  }, [todo]);

  async function handleUpdate() {
    if (!title.trim()) {
      toast.error("Please enter a todo title");
      return;
    }

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

      toast.success("Todo updated successfully");

      dispatch(fetchTodos());

      onClose();
    } catch (error) {
      toast.error(error || "Failed to update todo");
    }
  }

  return (
    <Modal
      title="Edit Todo"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <div className="space-y-5">
        <div>
          <label className="mb-2 block font-medium">
            Title
          </label>

          <Input
            placeholder="Enter todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="large"
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <span className="font-medium">
            Completed
          </span>

          <Switch
            checked={completed}
            onChange={(checked) => setCompleted(checked)}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="primary"
            onClick={handleUpdate}
          >
            Update Todo
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default EditTodoModal;