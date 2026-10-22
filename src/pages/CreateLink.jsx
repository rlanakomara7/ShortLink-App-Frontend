import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CreateLink() {
  const navigate = useNavigate();
  const [originalUrl, setOriginalUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    setMessage("");
    setLoading(true);

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

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user_email");
        navigate("/login", { replace: true });
        return;
      }

      if (response.ok) {
        navigate("/dashboard");
      } else {
        setMessage(data.message || "Failed to create link");
      }
    } catch {
      setMessage("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8fa] text-slate-900">
      <Navbar />

      <main className="flex flex-1 justify-center px-5 py-12">
        <div className="w-full max-w-140">
          <Link
            to="/dashboard"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to Dashboard
          </Link>

          <h1 className="mt-4 text-2xl font-bold">Create New Short Link</h1>

          <p className="mt-2 text-sm text-slate-500">
            Transform your long URLs into clean, manageable assets.
          </p>

          {/* Create Link*/}
          <div className="mt-7 rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="original-url"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide"
                >
                  Destination URL <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-[#f9fafb] px-3 focus-within:border-blue-600">
                  <span className="text-slate-400">🔗</span>

                  <input
                    id="original-url"
                    type="url"
                    required
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="https://example.com/your-long-url-here"
                    className="w-full min-w-0 bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
                  />
                </div>

                <p className="mt-2 text-xs italic text-slate-400">
                  Ensure your URL starts with http:// or https://
                </p>
              </div>

              {/* Slug */}
              <div>
                <label
                  htmlFor="custom-slug"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide"
                >
                  Custom Slug (Optional)
                </label>

                <div className="flex overflow-hidden rounded-lg border border-slate-200 focus-within:border-blue-600">
                  <span className="flex shrink-0 items-center border-r border-slate-200 bg-[#f4f5f7] px-4 text-sm text-slate-600">
                    short.link/
                  </span>

                  <input
                    id="custom-slug"
                    type="text"
                    minLength={3}
                    maxLength={50}
                    pattern="[a-zA-Z0-9-]+"
                    title="Use 3–50 letters, numbers, or hyphens"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="my-custom-slug"
                    className="w-full min-w-0 px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                  />
                </div>

                <p className="mt-2 text-xs italic text-slate-400">
                  Leave blank to generate a random unique identifier.
                </p>
              </div>

              {/* Preview */}
              <div className="rounded-lg border border-blue-100 bg-[#f1f4ff] p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  ◉ Live Preview
                </p>

                <p className="mt-2 break-all text-sm text-slate-700">
                  Your short link will be:{" "}
                  <span className="font-semibold text-blue-600">
                    {slug.trim()
                      ? `${window.location.origin}/${slug.trim()}`
                      : "Auto-generated after creation"}
                  </span>
                </p>
              </div>

              {message && (
                <p role="alert" className="text-sm text-red-600">
                  {message}
                </p>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-6 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  git
                >
                  {loading ? "Creating..." : "Create Link ⚡"}
                </button>

                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-slate-600 hover:text-blue-600"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>

          {/* Information */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                ↗
              </span>

              <div>
                <h3 className="text-sm font-bold">Real-time Analytics</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Track every click, geographical location, and referral source
                  instantly.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                ▦
              </span>

              <div>
                <h3 className="text-sm font-bold">Auto-generated QR</h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Every link automatically creates a high-resolution QR code for
                  print.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CreateLink;
