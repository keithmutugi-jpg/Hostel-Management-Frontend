import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

export default function Register() {
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // CHANGED: Providing both username and full_name properties to ensure the 422 validation clears
        body: JSON.stringify({ 
          username: email,       
          full_name: name,
          email: email, 
          password: password 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration complete! Navigating to your login screen.");
        navigate("/login");
      } else {
        if (typeof data.detail === "object") {
          alert(data.detail[0]?.msg || JSON.stringify(data.detail));
        } else {
          alert(data.detail || "Registration workflow rejected.");
        }
      }
    } catch (error) {
      alert("Server connection refused.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-white p-7 shadow-2xl shadow-black/30">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600">Get started</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Create Account</h1>
        <p className="mt-2 text-sm text-slate-500">Set up standard access for your hostel workspace platform.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">Full Name</label>
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Jason Doe"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">Email Address</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">Password</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Create strong secure credential string"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full rounded-lg bg-teal-500 py-3 font-black text-slate-950 shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? "Transmitting Profile..." : "Register"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-teal-700 hover:text-teal-600">Login</Link>
        </p>
      </div>
    </div>
  );
}