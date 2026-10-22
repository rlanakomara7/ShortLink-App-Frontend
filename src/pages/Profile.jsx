import { useNavigate, Link } from "react-router";

function Profile() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("user_email");

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Link to="/login" className="text-blue-600">
          Please login to view your profile
        </Link>
      </div>
    );
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold text-blue-600">Shortlink</h1>

          <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
            Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-6 py-12">
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
              {email ? email.charAt(0).toUpperCase() : "U"}
            </div>
          </div>

          <h2 className="text-center text-2xl font-bold text-gray-900">
            My Profile
          </h2>

          <p className="mt-2 text-center text-gray-500">
            Your account information
          </p>

          <div className="mt-8 rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="mt-1 break-all font-medium text-gray-900">
              {email || "Email not available"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 w-full rounded-lg bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}

export default Profile;
