import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-3 py-2 rounded transition ${
      location.pathname === path
        ? "bg-gray-700 text-blue-400"
        : "hover:bg-gray-700"
    }`;

  return (
    <>
      {/* Sidebar */}
      <div className="hidden md:block w-64 min-h-screen bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-8">
          Hostel System
        </h2>

        <ul className="space-y-3">
          <li>
            <Link to="/dashboard" className={linkClass("/dashboard")}>
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/rooms" className={linkClass("/rooms")}>
              Rooms
            </Link>
          </li>

          <li>
            <Link to="/maintenance" className={linkClass("/maintenance")}>
              Maintenance
            </Link>
          </li>

          <li>
            <Link to="/admin" className={linkClass("/admin")}>
              Admin Panel
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between">
        <span className="font-bold">Hostel System</span>
      </div>
    </>
  );
};

export default Sidebar;