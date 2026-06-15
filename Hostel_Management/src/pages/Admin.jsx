import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

const initialApplications = [
  { id: 1, name: "John Doe", room: "Single Room", status: "Pending" },
  { id: 2, name: "Mary Wanjiku", room: "Double Room", status: "Pending" },
  { id: 3, name: "Alex Kimani", room: "Ensuite", status: "Pending" },
];

export default function Admin() {
  const [applications, setApplications] = useState(initialApplications);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (app) => {
    setSelectedApp(app);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedApp(null);
    setIsOpen(false);
  };

  const updateStatus = (status) => {
    const updated = applications.map((app) =>
      app.id === selectedApp.id
        ? { ...app, status }
        : app
    );

    setApplications(updated);
    closeModal();
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 pb-20 md:pb-0">
        <Navbar />

        <main className="p-4 md:p-8">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600">
              Admissions
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Application Review
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="rounded-xl border border-white bg-white/90 p-5 shadow-xl shadow-slate-200/70"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-indigo-50 font-black text-indigo-700">
                    {app.name.slice(0, 1)}
                  </span>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                    {app.status}
                  </span>
                </div>

                <h2 className="text-lg font-black text-slate-950">{app.name}</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Room: {app.room}
                </p>

                <Button
                  className="mt-5 w-full"
                  onClick={() => openModal(app)}
                >
                  Review
                </Button>
              </div>
            ))}
          </div>

          <Modal isOpen={isOpen} onClose={closeModal}>
            {selectedApp && (
              <div>
                <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-950">
                  Review Application
                </h2>

                <p className="text-slate-600">
                  <strong>Name:</strong> {selectedApp.name}
                </p>

                <p className="text-slate-600">
                  <strong>Room:</strong> {selectedApp.room}
                </p>

                <p className="mt-2 text-slate-600">
                  <strong>Status:</strong>{" "}
                  {selectedApp.status}
                </p>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => updateStatus("Approved")}
                    className="rounded-lg bg-teal-500 px-4 py-2 font-bold text-slate-950 hover:bg-teal-400"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus("Rejected")}
                    className="rounded-lg bg-rose-500 px-4 py-2 font-bold text-white hover:bg-rose-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}
          </Modal>
        </main>
      </div>
    </div>
  );
}
