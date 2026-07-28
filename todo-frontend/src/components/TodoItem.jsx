import { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Button, Tag, Popconfirm, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

import { Typography } from "antd";

const { Title, Text } = Typography;

import { removeTodo, fetchTodos } from "../features/todos/todoSlice";

import EditTodoModal from "./EditTodoModal";

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  async function handleDelete() {
    try {
      await dispatch(removeTodo(todo.id)).unwrap();

      toast.success("Todo deleted successfully");

      dispatch(fetchTodos());
    } catch (error) {
      toast.error(error || "Failed to delete todo");
    }
  }

  return (
    <>
      <Card
        className="mb-4 shadow-sm"
        bodyStyle={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Title level={5} className="!mb-2">
            {todo.title}
          </Title>

          <Text type="secondary">
            <CalendarOutlined className="mr-2" />
            {new Date(todo.created_at).toLocaleString()}
          </Text>

          <div className="mt-2">
            {todo.completed ? (
              <Tag color="success">Completed</Tag>
            ) : (
              <Tag color="warning">Pending</Tag>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip title="Edit Todo">
            <Button type="text" icon={<EditOutlined />} onClick={openModal} />
          </Tooltip>

          <Popconfirm
            title="Delete Todo"
            description="Are you sure you want to delete this todo?"
            okText="Yes"
            cancelText="No"
            onConfirm={handleDelete}
          >
            <Tooltip title="Delete Todo">
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </div>
      </Card>

      <EditTodoModal open={isModalOpen} todo={todo} onClose={closeModal} />
    </>
  );
}

export default TodoItem;
