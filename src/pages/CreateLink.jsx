import { useState } from "react";
import { Link, useNavigate } from "react-router";

function CreateLink() {
  const navigate = useNavigate();

  const [originalUrl, setOriginalUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          original_url: originalUrl,
          slug: slug.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/dashboard");
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Create Shortlink
        </h1>

        <p className="mb-6 text-gray-500">
          Create a short and easy-to-share link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Original URL
            </label>

            <input
              type="url"
              required
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Custom Slug (Optional)
            </label>

            <input
              type="text"
              minLength={3}
              maxLength={50}
              pattern="[A-Za-z0-9-]+"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="my-link"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
            />

            <p className="mt-2 text-sm text-gray-500">
              Leave empty to generate a random slug.
            </p>
          </div>

          {message && <p className="text-sm text-red-600">{message}</p>}

          <div className="flex gap-3">
            <Link
              to="/dashboard"
              className="flex-1 rounded-lg border border-gray-300 p-3 text-center"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-blue-600 p-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateLink;
