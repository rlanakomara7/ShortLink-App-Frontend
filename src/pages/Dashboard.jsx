import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

function Dashboard() {
  const navigate = useNavigate();

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getLinks() {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await fetch("/api/links", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        const data = await response.json();

        if (response.ok) {
          setLinks(data.results);
        } else {
          setMessage(data.message);
        }
      } catch {
        setMessage("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    }

    getLinks();
  }, [navigate]);

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this link?",
    );

    if (!confirmed) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`/api/links/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }

      if (response.ok) {
        setLinks(links.filter((link) => link.id !== id));
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch {
      setMessage("Failed to delete shortlink");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold text-blue-600">Shortlink</h1>

          <Link to="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-blue-600">
            Profile
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>

            <p className="mt-2 text-gray-500">
              Manage your shortlinks in one place.
            </p>
          </div>
          <Link
            to="/links/create"
            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            Create Shortlink
          </Link>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-xl font-semibold text-gray-900">
            My Shortlinks
          </h3>
          {loading && <p className="text-gray-500">Loading shortlinks...</p>}
          {message && <p className="text-red-600">{message}</p>}
          {!loading && !message && links.length === 0 && (
            <p className="text-gray-500">
              You have not created any shortlinks yet.
            </p>
          )}

          {!loading && !message && links.length > 0 && (
            <div className="space-y-4">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <a
                    href={link.short_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {link.short_url}
                  </a>

                  <p className="mt-2 break-all text-sm text-gray-500">
                    Original: {link.original_url}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleDelete(link.id)}
                    className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
