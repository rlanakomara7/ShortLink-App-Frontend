import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("user_email");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    navigate("/login", { replace: true });
  }

  if (!token) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f7f8fa]">
        <Navbar />

        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-5">
          <h1 className="text-xl font-bold text-slate-900">
            Please log in to view your profile
          </h1>

          <Link
            to="/login"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white"
          >
            Go to Login
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8fa]">
      <Navbar />

      <main className="flex flex-1 justify-center px-5 py-12">
        <div className="w-full max-w-xl">
          <Link
            to="/dashboard"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to Dashboard
          </Link>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">My Profile</h1>

          <p className="mt-2 text-sm text-slate-500">
            View your account information and manage your session.
          </p>

          <div className="mt-7 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
                {email ? email.charAt(0).toUpperCase() : "U"}
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-900">
                Account Information
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Your ShortLink account
              </p>
            </div>

            <div className="mt-8 rounded-lg border border-slate-100 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Email Address
              </p>

              <p className="mt-2 break-all text-sm font-medium text-slate-900">
                {email || "Email not available"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-8 w-full rounded-lg border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
