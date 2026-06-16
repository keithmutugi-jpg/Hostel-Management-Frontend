import { useState } from "react";
import { useMaintenance} from "../context/MaintenaceContext"

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function Maintenance() {
  const {requests, addRequest} = useMaintenance();

  const [issue, setIssue] = useState("");

  const submitRequest = (e) => {
    e.preventDefault()
    if(!issue) return
    addRequest(issue)
    setIssue("");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 pb-20 md:pb-0">
        <Navbar />

        <main className="p-4 md:p-8">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600">
              Service desk
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Maintenance Requests
            </h1>
          </div>

          <form
            onSubmit={submitRequest}
            className="mb-6 rounded-xl border border-white bg-white/90 p-5 shadow-xl shadow-slate-200/70"
          >
            <h2 className="mb-3 text-lg font-black text-slate-950">
              Submit New Request
            </h2>

            <input
              type="text"
              placeholder="Describe the issue..."
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="mb-3 w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
            />

            <button
              type="submit"
              className="rounded-lg bg-teal-500 px-4 py-2 font-black text-slate-950 shadow-lg shadow-teal-500/20 transition hover:-translate-y-0.5 hover:bg-teal-400"
            >
              Submit
            </button>
          </form>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {requests.map((req) => (
              <div
                key={req.id}
                className="rounded-xl border border-white bg-white/90 p-5 shadow-xl shadow-slate-200/70"
              >
                <h3 className="font-black text-slate-950">
                  {req.issue}
                </h3>

                <p className="mt-3 text-sm text-slate-500">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      req.status === "Resolved"
                        ? "bg-teal-50 text-teal-700"
                        : req.status === "In Progress"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
