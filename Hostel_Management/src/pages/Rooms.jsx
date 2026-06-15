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
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 pb-20 md:pb-0">
        <Navbar />

        <main className="p-4 md:p-8">
          <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600">
                Inventory
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                Available Rooms
              </h1>
            </div>
            <div className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-lg shadow-slate-200/70">
              {roomsData.filter((room) => room.status === "Available").length} open rooms
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {roomsData.map((room) => (
              <div
                key={room.id}
                className="rounded-xl border border-white bg-white/90 p-5 shadow-xl shadow-slate-200/70 transition hover:-translate-y-1"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white">
                    {room.id}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      room.status === "Available"
                        ? "bg-teal-50 text-teal-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {room.status}
                  </span>
                </div>
                <h2 className="text-xl font-black text-slate-950">
                  {room.type}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Quiet floor, furnished, and ready for student assignment.
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
