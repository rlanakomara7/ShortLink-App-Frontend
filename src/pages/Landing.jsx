import { useState } from "react";
import { Link, useNavigate } from "react-router";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Landing() {
  const navigate = useNavigate();

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleShorten(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setMessage("");
    setShortUrl("");

    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          original_url: url,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user_email");
        navigate("/login");
        return;
      }

      if (response.ok) {
        setShortUrl(data.results.short_url);
        setUrl("");
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
    <div className="min-h-screen bg-[#f4f5f7] text-[#191b1f]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#fafbff] px-6 py-24 text-center md:py-32">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Shorten URLs. <span className="text-blue-600">Share Easily.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600">
            Create short, memorable links for your team communications.
            Transform long, cumbersome URLs into powerful digital assets that
            drive engagement.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
            >
              Get Started
            </Link>

            <a
              href="#features"
              className="rounded-lg border border-slate-200 px-8 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
            >
              Learn More
            </a>
          </div>

          {/* Shortener Form */}
          <form
            onSubmit={handleShorten}
            className="mx-auto mt-14 flex max-w-2xl flex-col gap-3 rounded-xl bg-white p-4 shadow-xl shadow-slate-200 sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-3">
              <span className="text-slate-400">🔗</span>

              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://very-long-architectural-url.com/asset-id-99238-x1"
                className="min-w-0 flex-1 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Shortening..." : "Shorten"}
            </button>
          </form>

          {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

          {shortUrl && (
            <div className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-4 rounded-lg bg-blue-50 p-4">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-sm font-medium text-blue-600"
              >
                {shortUrl}
              </a>

              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(shortUrl)}
                className="text-sm font-semibold text-blue-700"
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Architectural Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-xs font-bold tracking-widest text-blue-600">
          ARCHITECTURAL FEATURES
        </p>

        <h2 className="mt-3 text-3xl font-extrabold">
          Built for Enterprise Precision
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Easy Create */}
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl text-blue-600">
              ⚡
            </div>

            <h3 className="mt-6 text-lg font-bold">Easy Create</h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Instantly generate high-performance short links with a single
              click or through our surgical API endpoints.
            </p>

            <div className="mt-8 h-1 w-10 bg-blue-200" />
          </div>

          {/* Custom Slugs */}
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-2xl text-indigo-600">
              ✎
            </div>

            <h3 className="mt-6 text-lg font-bold">Custom Slugs</h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Maintain brand authority with readable, custom link endings that
              resonate with your digital audience.
            </p>

            <div className="mt-8 h-1 w-10 bg-indigo-200" />
          </div>

          {/* Team Ready */}
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-2xl text-orange-700">
              ♟
            </div>

            <h3 className="mt-6 text-lg font-bold">Team Ready</h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Collaborate across departments with shared workspaces,
              permissions, and unified analytics dashboards.
            </p>

            <div className="mt-8 h-1 w-10 bg-orange-200" />
          </div>
        </div>
      </section>

      {/* Data Driven*/}
      <section className="mx-auto max-w-7xl bg-white px-6 py-20 md:px-12">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=85"
              alt="Laptop displaying analytics charts near a window"
              className="h-80 w-full object-cover md:h-105"
            />
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest text-slate-500">
              DATA DRIVEN INSIGHTS
            </p>

            <h2 className="mt-4 max-w-lg text-3xl font-extrabold leading-tight">
              Observe your link architecture in real-time.
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-slate-600">
              Every click is a data point. Our dashboard provides surgical
              precision into where your traffic originates, who is engaging, and
              how your team communications are performing across the globe.
            </p>

            <div className="mt-8 space-y-4 text-sm font-medium text-slate-800">
              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  ✓
                </span>
                Geographic Distribution Maps
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  ✓
                </span>
                Device & Browser Breakdown
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  ✓
                </span>
                UTM Parameter Tracking
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Landing;
