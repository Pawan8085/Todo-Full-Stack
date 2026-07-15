import { useSelector } from "react-redux";

function Navbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="flex items-center justify-between bg-blue-600 px-6 py-4 text-white">
      <h1 className="text-xl font-bold">
        Todo App
      </h1>

      <div>
        Welcome, {user?.name}
      </div>
    </nav>
  );
}

export default Navbar;