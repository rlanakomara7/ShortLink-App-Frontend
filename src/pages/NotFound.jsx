import { Link } from "react-router";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-8xl font-bold text-blue-600">404</h1>

      <h2 className="mt-4 text-3xl font-semibold text-gray-900">
        Page Not Found
      </h2>

      <p className="mt-4 max-w-md text-gray-500">
        The page you are looking for does not exist or may have been moved.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
