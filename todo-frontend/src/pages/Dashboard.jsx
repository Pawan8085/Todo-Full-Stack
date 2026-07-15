import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../features/todos/todoSlice";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

function Dashboard() {
  const dispatch = useDispatch();

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
    dispatch(fetchTodos({
        page: 1,
        limit
        
      }));
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

  function handlePrevious() {
    if (currentPage > 1) {
      dispatch(
        fetchTodos({
          page: currentPage - 1,
          limit,
          search
        }),
      );
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      dispatch(
        fetchTodos({
          page: currentPage + 1,
          limit,
          search
        }),
      );
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">My Todos</h1>

      <p className="mb-4">
        Total Todos: <strong>{totalTodos}</strong>
      </p>

      <SearchBar onSearch={handleSearch} />

      <TodoForm />

      <TodoList todos={todos} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}

export default Dashboard;
