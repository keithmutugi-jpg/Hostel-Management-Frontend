
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4">
      <ul className="space-y-4">
        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/rooms">Rooms</Link>
        </li>

        <li>
          <Link to="/maintenance">Maintenance</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;