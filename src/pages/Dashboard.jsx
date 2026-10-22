import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ITEMS_PER_PAGE = 4;

function Dashboard() {
  const navigate = useNavigate();

  const [links, setLinks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    async function fetchLinks() {
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

        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user_email");
          navigate("/login", { replace: true });
          return;
        }

        if (!response.ok) {
          setMessage(data.message || "Failed to load links");
          return;
        }

        setLinks(Array.isArray(data.results) ? data.results : []);
      } catch {
        setMessage("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    }

    fetchLinks();
  }, [navigate]);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this link?")) {
      return;
    }

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
        localStorage.removeItem("user_email");
        navigate("/login", { replace: true });
        return;
      }

      if (!response.ok) {
        setMessage("Failed to delete link");
        return;
      }

      setLinks((current) => current.filter((link) => link.id !== id));
      setMessage("");
    } catch {
      setMessage("Unable to connect to server");
    }
  }

  async function handleCopy(link) {
    try {
      await navigator.clipboard.writeText(link.short_url);
      setCopiedId(link.id);
    } catch {
      setMessage("Failed to copy link");
    }
  }

  function handleSearch(value) {
    setSearch(value);
    setPage(1);
  }

  function formatDate(value) {
    if (!value) return "Unknown date";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "Unknown date";

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const filteredLinks = links.filter((link) => {
    const keyword = search.toLowerCase();

    return (
      (link.slug || "").toLowerCase().includes(keyword) ||
      (link.original_url || "").toLowerCase().includes(keyword)
    );
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLinks.length / ITEMS_PER_PAGE),
  );

  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const visibleLinks = filteredLinks.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8fb] text-[#191b1f]">
      <Navbar />

      <main className="w-full flex-1 px-5 py-10">
        <div className="mx-auto max-w-2xl">
          {/* Heading */}
          <div className="mb-7 flex flex-wrap items-center justify-between gap-5">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">
                My Links
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage and track your shortened digital assets.
              </p>

              <p className="mt-3 text-xs font-semibold tracking-wide text-slate-500">
                TOTAL ACTIVE:
                <span className="ml-2 text-base font-bold text-blue-600">
                  {links.length}
                </span>
              </p>
            </div>

            <Link
              to="/links/create"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700"
            >
              + Create New Link
            </Link>
          </div>

          {/* Search */}
          <div className="mb-9 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-slate-400"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              type="search"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by name or URL..."
              className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          {message && (
            <p role="alert" className="mb-5 text-sm text-red-600">
              {message}
            </p>
          )}

          {/* Link List */}
          <div className="space-y-4">
            {loading ? (
              <div className="rounded-xl bg-white px-5 py-10 text-center text-sm text-slate-500">
                Loading links...
              </div>
            ) : visibleLinks.length === 0 ? (
              <div className="rounded-xl border border-slate-100 bg-white px-5 py-12 text-center">
                <h2 className="font-semibold text-slate-900">No links found</h2>

                <p className="mt-2 text-sm text-slate-500">
                  {search
                    ? "Try searching with a different keyword."
                    : "Create your first shortlink to get started."}
                </p>
              </div>
            ) : (
              visibleLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-100 bg-white px-5 py-5 shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <a
                      href={link.short_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-fit max-w-full items-center gap-2 text-sm font-bold text-blue-600 hover:underline"
                    >
                      <span className="shrink-0">🔗</span>

                      <span className="truncate">{link.short_url}</span>
                    </a>

                    <p
                      className="mt-1 truncate text-sm text-slate-500"
                      title={link.original_url}
                    >
                      {link.original_url}
                    </p>

                    <div className="mt-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                      {formatDate(link.created_at)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(link)}
                      title="Copy shortlink"
                      aria-label="Copy shortlink"
                      className="rounded-lg bg-blue-50 p-3 text-blue-600 hover:bg-blue-100"
                    >
                      {copiedId === link.id ? (
                        <span className="text-sm font-bold">✓</span>
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="8" y="8" width="12" height="12" rx="2" />
                          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                        </svg>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(link.id)}
                      title="Delete shortlink"
                      aria-label="Delete shortlink"
                      className="rounded-lg p-3 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 10v7M14 10v7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {!loading && filteredLinks.length > 0 && (
            <div className="mt-10 flex items-center justify-between gap-3 text-sm">
              <button
                type="button"
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-slate-500 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ‹ Prev Page
              </button>

              <div className="flex items-center gap-3">
                <span className="rounded-md bg-blue-100 px-3 py-1.5 font-semibold text-blue-600">
                  {currentPage}
                </span>

                <span className="text-slate-400">of</span>

                <span className="font-medium text-slate-700">{totalPages}</span>
              </div>

              <button
                type="button"
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-slate-500 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next ›
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
