import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Card from "../components/ui/Card";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        <Navbar />

        <main className="p-4 md:p-8">
          <section className="mb-6 rounded-xl bg-slate-950 px-5 py-6 text-white shadow-2xl shadow-slate-300/70 md:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">
              Today at a glance
            </p>
            <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h1 className="text-3xl font-black tracking-tight md:text-5xl">
                  Dashboard Overview
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                  Track room availability, student activity, and service requests
                  from one clean command center.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/10 px-4 py-3">
                <p className="text-xs text-slate-300">Next check-in</p>
                <p className="text-2xl font-black">09:30</p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Card title="Total Students" value="120" accent="teal" />
            <Card title="Available Rooms" value="45" accent="indigo" />
            <Card title="Pending Requests" value="8" accent="coral" />
          </div>

          <section className="mt-6 grid gap-4 md:grid-cols-[1.4fr_0.8fr]">
            <div className="rounded-xl border border-white bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-6">
              <h2 className="text-xl font-black tracking-tight text-slate-950">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base">
                Manage hostel operations including rooms, maintenance requests,
                and student applications.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-teal-50 p-3">
                  <p className="text-lg font-black text-teal-700">32</p>
                  <p className="text-xs text-slate-500">Move-ins</p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-3">
                  <p className="text-lg font-black text-indigo-700">14</p>
                  <p className="text-xs text-slate-500">Inspections</p>
                </div>
                <div className="rounded-lg bg-rose-50 p-3">
                  <p className="text-lg font-black text-rose-700">5</p>
                  <p className="text-xs text-slate-500">Urgent</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-6">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                Room Health
              </p>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-3/4 rounded-full bg-teal-500" />
              </div>
              <p className="mt-4 text-3xl font-black text-slate-950">75%</p>
              <p className="text-sm text-slate-500">Ready for allocation</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
