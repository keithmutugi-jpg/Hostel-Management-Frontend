import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 py-4 shadow-sm shadow-slate-200/60 backdrop-blur md:px-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
          Hostel Management
        </p>
        <h1 className="mt-1 text-lg font-black tracking-tight text-slate-950 md:text-xl">
          Operations Console
        </h1>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-lg border border-slate-200 bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
