import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
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
        <div className="w-full max-w-[380px]">
          {/* Heading */}
          <div className="mb-7 text-center">
            <div className="mx-auto flex h-9 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>

            <h1 className="mt-7 text-2xl font-bold">Create Account</h1>

            <p className="mt-2 text-sm text-slate-500">
              Join the elite architects of the web.
            </p>
          </div>

          {/* Register Form */}
          <div className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="register-email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>

                <input
                  id="register-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label
                  htmlFor="register-password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <input
                  id="register-password"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
                />

                <p className="mt-1 text-[10px] font-medium tracking-wider text-slate-500">
                  MINIMUM 8 CHARACTERS
                </p>
              </div>

              <div>
                <label
                  htmlFor="register-confirm"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Confirm Password
                </label>

                <input
                  id="register-confirm"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
                />
              </div>

              {message && (
                <p role="alert" className="text-sm text-red-600">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-3 text-sm font-semibold text-white hover:from-blue-800 hover:to-blue-700 disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Sign Up →"}
              </button>
            </form>

            <p className="mt-5 text-center text-xs leading-relaxed text-slate-500">
              By signing up, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>

          <p className="mt-7 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-600">
              Log in
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Register;
