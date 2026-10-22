import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [email, setEmail] = useState("");
  const [memberSince, setMemberSince] = useState("");
  const [totalLinks, setTotalLinks] = useState(null);
  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    async function loadProfile() {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const profileResponse = await fetch("/api/profile", {
          headers,
        });

        if (profileResponse.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user_email");
          navigate("/login", { replace: true });
          return;
        }

        if (!profileResponse.ok) {
          setMessage("Failed to load profile");
          return;
        }

        const profileData = await profileResponse.json();
        const userEmail = profileData.results.email;

        setEmail(userEmail);
        setMemberSince(profileData.results.created_at);

        const savedPhoto = localStorage.getItem(`profile_photo_${userEmail}`);

        setPhoto(savedPhoto || "");

        const linksResponse = await fetch("/api/links", {
          headers,
        });

        if (linksResponse.ok) {
          const linksData = await linksResponse.json();
          setTotalLinks(
            Array.isArray(linksData.results) ? linksData.results.length : 0,
          );
        }
      } catch {
        setMessage("Unable to connect to server");
      }
    }

    loadProfile();
  }, [token, navigate]);

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];

    if (!file || !email) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setMessage("Please select a JPG, PNG, or WebP image");
      return;
    }

    if (file.size > 1024 * 1024) {
      setMessage("Image size must be less than 1 MB");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") return;

      try {
        localStorage.setItem(`profile_photo_${email}`, result);
        setPhoto(result);
        window.dispatchEvent(new Event("profile-photo-updated"));
        setMessage("");
      } catch {
        setMessage("Unable to save photo in browser storage");
      }
    };

    reader.onerror = () => {
      setMessage("Failed to read image");
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    navigate("/login", { replace: true });
  }

  function formatDate(value) {
    if (!value) return "Loading...";

    const date = new Date(`${value}T00:00:00`);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fc] text-slate-900">
      <Navbar />

      <main className="flex flex-1 justify-center px-5 py-12">
        <div className="w-full max-w-[640px]">
          <p className="mb-5 text-xs font-semibold tracking-widest text-slate-500">
            ACCOUNT MANAGEMENT
          </p>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {/* Heading */}
            <h1 className="text-2xl font-bold">Profile</h1>

            {/* Avatar */}
            <div className="mt-10 flex items-center gap-5">
              <div className="relative shrink-0">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-slate-900 text-3xl font-bold text-white">
                  {photo ? (
                    <img
                      src={photo}
                      alt="Profile avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    email.charAt(0).toUpperCase() || "U"
                  )}
                </div>

                <label
                  htmlFor="profile-photo"
                  title="Edit profile photo"
                  className="absolute -bottom-2 -right-2 cursor-pointer rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-blue-600 shadow-sm hover:bg-blue-50"
                >
                  ✎
                </label>

                <input
                  id="profile-photo"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>

              <div className="min-w-0">
                <h2 className="break-all text-lg font-bold">
                  {email || "ShortLink User"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">ShortLink Account</p>
              </div>
            </div>

            {/* Account Information */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-[#f2f3f5] p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Email Address
                </p>

                <p className="mt-2 break-all text-sm font-medium">
                  {email || "Loading..."}
                </p>
              </div>

              <div className="rounded-lg bg-[#f2f3f5] p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Account Tenure
                </p>

                <p className="mt-2 text-sm font-medium">
                  Member since: {formatDate(memberSince)}
                </p>
              </div>
            </div>

            {/* Active Assets */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-blue-700 px-6 py-5 text-white">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-blue-600 p-3">↗</div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-100">
                    Active Assets
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {totalLinks === null ? "—" : totalLinks}
                  </p>
                </div>
              </div>

              <Link
                to="/dashboard"
                className="rounded-lg border border-blue-400 bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
              >
                VIEW LINKS
              </Link>
            </div>

            {/* Security */}
            <div className="mt-9 flex items-center justify-between gap-3 border-b border-slate-100 pb-7">
              <p className="text-sm font-medium">Two-Factor Authentication</p>

              <span className="text-xs font-bold text-slate-400">
                NOT AVAILABLE
              </span>
            </div>

            {message && (
              <p role="alert" className="mt-5 text-sm text-red-600">
                {message}
              </p>
            )}

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="mt-7 w-full rounded-lg border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Logout Session
            </button>
          </section>

          <p className="mt-8 text-center text-xs text-slate-400">
            Manage your account and shortlinks securely.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
