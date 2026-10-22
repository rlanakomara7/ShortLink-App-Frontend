import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.results.access_token);
        localStorage.setItem("user_email", email.trim().toLowerCase());
        navigate("/dashboard");
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Unable to connect to server");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="mb-2 text-center text-3xl font-bold text-blue-600">
          Shortlink
        </h1>

        <h2 className="mb-6 text-center text-xl font-semibold">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border p-3"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border p-3"
              placeholder="Enter your password"
            />
          </div>

          {message && <p className="text-sm text-red-600">{message}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 p-3 font-medium text-white hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
