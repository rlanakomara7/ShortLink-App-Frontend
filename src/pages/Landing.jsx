function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <h1 className="text-2xl font-bold text-blue-600">Shortlink</h1>

        <div className="flex items-center gap-4">
          <a href="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </a>

          <a
            href="/register"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <main className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <h2 className="max-w-3xl text-5xl font-bold leading-tight text-gray-900">
          Make Your Links Shorter and Easier to Share
        </h2>

        <p className="mt-6 max-w-xl text-lg text-gray-500">
          Create short, simple, and memorable links in seconds. Manage all your
          links from one dashboard.
        </p>

        <a
          href="/register"
          className="mt-8 rounded-lg bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700"
        >
          Create Your Shortlink
        </a>
      </main>
    </div>
  );
}

export default Landing;
