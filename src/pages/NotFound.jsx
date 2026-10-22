import { Link } from "react-router";
import Footer from "../components/Footer";
import { LuLink2Off } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f1f4f9] text-slate-900">
      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="w-full max-w-2xl text-center">
          {/* Error Illustration */}
          <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/60">
              <LuLink2Off className="text-5xl text-slate-300" />
            </div>

            <div className="absolute -right-1 top-0 flex h-9 w-9 rotate-12 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg">
              <FiAlertTriangle className="text-xl" />
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
