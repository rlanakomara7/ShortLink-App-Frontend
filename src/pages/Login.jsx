import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fc] text-slate-900">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="w-full max-w-95">
          <div className="mb-7 text-center">
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-tight text-slate-950"
            >
              ShortLink
            </Link>
          </div>

          {/* Login Form */}
          <div className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
            <h1 className="text-2xl font-bold">Welcome Back</h1>

            <p className="mt-2 text-sm text-slate-500">
              Please enter your details to sign in.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>

                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-md border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-md border border-slate-200 px-4 py-3 pr-12 text-sm outline-none focus:border-blue-600"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute inset-y-0 right-3 text-xs font-medium text-slate-500 hover:text-blue-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {message && (
                <p role="alert" className="text-sm text-red-600">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:from-blue-800 hover:to-blue-700 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Log In →"}
              </button>
            </form>

            <p className="mt-7 text-center text-xs font-medium tracking-wider text-slate-400">
              OR CONTINUE WITH
            </p>

            <div className="mt-5 rounded-md border border-slate-200 px-4 py-3 text-center text-sm text-slate-400">
              Google Sign-In is not available
            </div>
          </div>

          <p className="mt-7 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
