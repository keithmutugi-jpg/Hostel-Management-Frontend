import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Card from "../components/ui/Card";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <div className="p-4 md:p-6">

          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Dashboard Overview
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

            <Card title="Total Students" value="120" />
            <Card title="Available Rooms" value="45" />
            <Card title="Pending Requests" value="8" />

          </div>

          {/* Info Section */}
          <div className="mt-6 md:mt-8 bg-white p-4 md:p-6 rounded-xl shadow">

            <h2 className="text-lg md:text-xl font-semibold mb-2">
              Welcome Back 👋
            </h2>

            <p className="text-gray-600 text-sm md:text-base">
              Manage hostel operations including rooms, maintenance requests, and student applications.
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}