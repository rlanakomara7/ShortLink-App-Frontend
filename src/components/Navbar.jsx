import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiChevronDown, FiUser, FiLogOut } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("user_email");
  const initial = email ? email.charAt(0).toUpperCase() : "U";
  const [isOpen, setIsOpen] = useState(false);
  const [photo, setPhoto] = useState(
    () => localStorage.getItem(`profile_photo_${email}`) || "",
  );

  // Update avatar
  useEffect(() => {
    function updatePhoto() {
      setPhoto(localStorage.getItem(`profile_photo_${email}`) || "");
    }

    window.addEventListener("profile-photo-updated", updatePhoto);

    return () => {
      window.removeEventListener("profile-photo-updated", updatePhoto);
    };
  }, [email]);

  // Close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    setPhoto("");
    setIsOpen(false);
    navigate("/login", { replace: true });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        {/* Navigation */}
        <div className="flex flex-wrap items-center gap-8">
          <Link
            to="/"
            className="text-xl font-extrabold tracking-tight text-slate-950"
          >
            ShortLink
          </Link>

          <div className="flex items-center gap-6 text-sm">
            <Link to="/dashboard" className="text-blue-600 hover:text-blue-700">
              Dashboard
            </Link>

            <span className="text-slate-400">Analytics</span>

            <Link
              to="/dashboard"
              className="text-slate-500 hover:text-blue-600"
            >
              Links
            </Link>
          </div>
        </div>

        {/* Account Navigation */}
        <div className="flex items-center gap-3 text-sm">
          {token ? (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open account menu"
                aria-expanded={isOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-full p-1 hover:bg-slate-100"
              >
                <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-slate-800 text-sm font-bold text-white">
                  {photo ? (
                    <img
                      src={photo}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initial
                  )}
                </span>

                <FiChevronDown
                  size={16}
                  className={`text-slate-500 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/*Dropdown */}
              {isOpen && (
                <div className="absolute right-0 top-full mt-3 w-60 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                  {/* Info */}
                  <div className="border-b border-slate-100 px-3 py-3">
                    <p className="text-sm font-bold text-slate-900">
                      My Account
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {email || "ShortLink User"}
                    </p>
                  </div>

                  {/*Profile */}
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="mt-2 flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                  >
                    <FiUser size={18} />
                    My Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <FiLogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 text-slate-600 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
