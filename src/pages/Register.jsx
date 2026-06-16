import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

export default function Register() {
  const navigate = useNavigate();
  
  // Dynamic state hooks for form handling
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully! Proceeding to login.");
        navigate("/login");
      } else {
        alert(data.detail || "Registration failed. Please check your details.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Server not reachable. Please verify that the backend engine is running.");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-white p-7 shadow-2xl shadow-black/30">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600">
          Get started
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
          Create Account
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Set up access for your hostel operations workspace.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jason Doe"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
              Secure Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-teal-500 py-3 font-black text-slate-950 shadow-lg shadow-teal-500/25 transition hover:-translate-y-0.5 hover:bg-teal-400 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-teal-700 hover:text-teal-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}