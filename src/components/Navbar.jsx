import { Link, useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    navigate("/login");
  }

  return (
    <header className=" sticky border-b border-slate-100 bg-white">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-xl font-extrabold tracking-tight text-slate-950"
          >
            ShortLink
          </Link>

          <div className="flex items-center gap-6 text-sm">
            <Link to="/dashboard" className="text-blue-600 hover:text-blue-700">
              Dashboard
            </Link>
            <span className="text-slate-400">Analytics</span>
            <Link
              to="/dashboard"
              className="text-slate-500 hover:text-blue-600"
            >
              Links
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          {token ? (
            <>
              <Link to="/profile" className="px-3 py-2 text-slate-600">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-md shadow-blue-200 hover:bg-blue-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 text-slate-600">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
