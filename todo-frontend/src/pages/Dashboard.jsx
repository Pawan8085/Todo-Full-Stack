import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../features/todos/todoSlice";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function Dashboard() {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  function showModal() {
    setIsModalOpen(true);
  }

  function handleClose() {
    setIsModalOpen(false);
  }

  const {
    todos,
    loading,
    error,
    currentPage,
    totalPages,
    totalTodos,
    limit,
    search,
  } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(
      fetchTodos({
        page: 1,
        limit,
      }),
    );
  }, [dispatch, limit]);

  function handleSearch(value) {
    dispatch(
      fetchTodos({
        page: 1,
        limit,
        search: value,
      }),
    );
  }

  if (error) {
    return <h2>{error}</h2>;
  }


  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Todos</h1>

          <p className="text-gray-500">
            Total Todos: <strong>{totalTodos}</strong>
          </p>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={showModal}
        >
          Create Todo
        </Button>
      </div>

      <Modal
        title="Create Todo"
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        destroyOnClose
      >
        <TodoForm onClose={handleClose} />
      </Modal>

      <SearchBar onSearch={handleSearch} />

      <TodoList todos={todos} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalTodos={totalTodos}
        limit={limit}
        onChange={(page) =>
          dispatch(
            fetchTodos({
              page,
              limit,
              search,
            }),
          )
        }
      />
    </div>
  );
}

export default Dashboard;
