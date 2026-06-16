import { Link, useLocation } from "react-router-dom";

const links = [
  { path: "/dashboard", label: "Dashboard", icon: "D" },
  { path: "/rooms", label: "Rooms", icon: "R" },
  { path: "/maintenance", label: "Maintenance", icon: "M" },
  { path: "/admin", label: "Admin Panel", icon: "A" },
];

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
      location.pathname === path
        ? "bg-white text-[#0f172a] shadow-lg shadow-black/15"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <>
      <aside className="hidden min-h-screen w-72 shrink-0 border-r border-white/10 bg-[#101827] p-5 text-white md:block">
        <div className="mb-10 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal-400 font-black text-[#101827] shadow-lg shadow-teal-500/20">
            H
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Hostel HQ</h2>
            <p className="text-xs text-slate-400">Live operations</p>
          </div>
        </div>

        <nav className="space-y-2">
          {links.map((link) => (
            <Link key={link.path} to={link.path} className={linkClass(link.path)}>
              <span className="grid h-8 w-8 place-items-center rounded-md bg-white/10 text-xs font-bold">
                {link.icon}
              </span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.06] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-teal-200">
            Occupancy
          </p>
          <p className="mt-2 text-3xl font-black">73%</p>
          <p className="mt-1 text-sm text-slate-400">Healthy room turnover</p>
        </div>
      </aside>

      <div className="md:hidden fixed bottom-3 left-3 right-3 z-30 rounded-xl border border-white/20 bg-[#101827]/95 p-2 text-white shadow-2xl shadow-slate-950/30 backdrop-blur">
        <nav className="grid grid-cols-4 gap-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-lg px-2 py-2 text-center text-xs font-semibold transition ${
                location.pathname === link.path
                  ? "bg-teal-400 text-[#101827]"
                  : "text-slate-300"
              }`}
            >
              {link.icon}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
