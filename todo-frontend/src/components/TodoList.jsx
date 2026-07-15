import TodoItem from "./TodoItem";

function TodoList({ todos }) {
  if (todos.length === 0) {
    return <p>No todos found.</p>;
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;