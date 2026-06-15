
import { Link } from "react-router-dom";

export default function Register() {
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

        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-teal-500 py-3 font-black text-slate-950 shadow-lg shadow-teal-500/25 transition hover:-translate-y-0.5 hover:bg-teal-400"
          >
            Register
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
