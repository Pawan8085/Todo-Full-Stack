import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);
  

  function handleChange(e) {
    const { name, value } = e.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await dispatch(loginUser(credentials)).unwrap();

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Login
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-1 block font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full rounded border p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block font-medium">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full rounded border p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <p className="mb-4 text-center text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 p-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;