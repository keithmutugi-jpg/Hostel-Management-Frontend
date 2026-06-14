import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
const roomsData = [
  { id: 1, type: "Single Room", status: "Available" },
  { id: 2, type: "Double Room", status: "Occupied" },
  { id: 3, type: "Ensuite", status: "Available" },
  { id: 4, type: "Single Room", status: "Available" },
  { id: 5, type: "Double Room", status: "Occupied" },
];

export default function Rooms() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">
            Available Rooms
          </h1>

          <div className="grid grid-cols-3 gap-4">
            {roomsData.map((room) => (
              <div
                key={room.id}
                className="bg-white shadow rounded-lg p-4"
              >
                <h2 className="text-xl font-semibold">
                  {room.type}
                </h2>

                <p className="mt-2 text-gray-600">
                  Status:
                  <span
                    className={`ml-2 font-bold ${
                      room.status === "Available"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {room.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
