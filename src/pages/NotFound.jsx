import { Link } from "react-router";
import Footer from "../components/Footer";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f1f4f9] text-slate-900">
      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="w-full max-w-2xl text-center">
          {/* Error Illustration */}
          <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/60">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#b6c1d8"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                <path d="M3 3l18 18" />
              </svg>
            </div>

            <div className="absolute -right-1 top-0 flex h-9 w-9 rotate-12 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-200">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3 2 21h20L12 3Z" />
                <path d="M12 9v5" />
                <path d="M12 17h.01" />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-5xl font-extrabold text-blue-700">404</h1>

          <h2 className="mt-3 text-2xl font-bold">Page Not Found</h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600">
            The page you're looking for doesn't exist. It may have been moved,
            deleted, or the link might be broken.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/dashboard"
              className="rounded-lg bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 hover:bg-blue-700"
            >
              ← Go to Dashboard
            </Link>

            <a
              href="mailto:rlanakomara7@gmail.com?subject=ShortLink%20Issue"
              className="rounded-lg border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
            >
              Report an Issue
            </a>
          </div>

          {/* Quick Links */}
          <div className="mt-16 grid gap-4 text-left sm:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 text-2xl text-blue-600">◫</div>

              <h3 className="text-sm font-bold">Check Analytics</h3>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Track your active links and traffic sources in real-time.
              </p>
            </div>

            <Link
              to="/links/create"
              className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md"
            >
              <div className="mb-4 text-2xl text-blue-600">↗</div>

              <h3 className="text-sm font-bold">New ShortLink</h3>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Create a brand new architected URL in seconds.
              </p>
            </Link>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 text-2xl text-blue-600">◈</div>

              <h3 className="text-sm font-bold">Developer API</h3>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Integrate our link infrastructure into your apps.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NotFound;
