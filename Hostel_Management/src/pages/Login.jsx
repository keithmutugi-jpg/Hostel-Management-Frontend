import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { API_BASE_URL } from "../config/api";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const hostelImage = "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1600&q=80";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.access_token) {
        login(data.access_token);
        navigate("/dashboard");
      } else {
        // Fixed: Safely parse FastAPI's nested validation arrays or error detail strings
        if (typeof data.detail === "object") {
          alert(data.detail[0]?.msg || JSON.stringify(data.detail));
        } else {
          alert(data.detail || "Invalid login parameters.");
        }
      }
    } catch (error) {
      alert("Backend service connection refused.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-slate-950 px-4 py-8 md:grid-cols-[1fr_480px] md:px-8">
      <section
        className="relative hidden min-h-[calc(100vh-4rem)] flex-col justify-between overflow-hidden rounded-xl bg-cover bg-center p-8 text-white md:flex"
        style={{ backgroundImage: `url(${hostelImage})` }}
      >
        <div className="absolute inset-0 bg-slate-950/50" />
        <div className="relative w-fit rounded-lg bg-slate-950/80 px-4 py-3 backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-300">Hostel Living</p>
          <p className="mt-1 text-sm text-slate-200">Shared spaces, organized.</p>
        </div>
        <div className="relative max-w-xl rounded-xl bg-slate-950/75 p-6 backdrop-blur">
          <h1 className="text-5xl font-black tracking-tight">Manage every room with calm precision.</h1>
          <p className="mt-4 text-slate-300">Students, rooms, requests, and approvals in one clean workspace.</p>
        </div>
      </section>

      <section className="flex items-center justify-center md:px-8">
        <div className="w-full max-w-md rounded-xl border border-white/10 bg-white p-7 shadow-2xl shadow-black/30">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600">Welcome back</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Sign in to Hostel HQ</h1>
          <p className="mt-2 text-sm text-slate-500">Keep operations moving from your dashboard.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-950 outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-950 outline-none focus:border-teal-500"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full rounded-lg bg-teal-500 py-3 font-black text-slate-950 shadow-lg disabled:opacity-50 transition hover:-translate-y-0.5"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-teal-700 hover:text-teal-600">Register</Link>
          </p>
        </div>
      </section>
    </div>
  );
}