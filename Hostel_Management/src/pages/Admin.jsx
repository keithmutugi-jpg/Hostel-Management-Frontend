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
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">
            Admin Panel - Applications
          </h1>

          {/* Application Cards */}
          <div className="grid grid-cols-3 gap-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white p-4 rounded shadow"
              >
                <h2 className="font-bold text-lg">
                  {app.name}
                </h2>

                <p className="text-gray-600">
                  Room: {app.room}
                </p>

                <p className="mt-2">
                  Status:
                  <span className="ml-2 font-bold text-yellow-600">
                    {app.status}
                  </span>
                </p>

                <Button
                  className="mt-4"
                  onClick={() => openModal(app)}
                >
                  Review
                </Button>
              </div>
            ))}
          </div>

          {/* Modal */}
          <Modal isOpen={isOpen} onClose={closeModal}>
            {selectedApp && (
              <div>
                <h2 className="text-xl font-bold mb-4">
                  Review Application
                </h2>

                <p>
                  <strong>Name:</strong> {selectedApp.name}
                </p>

                <p>
                  <strong>Room:</strong> {selectedApp.room}
                </p>

                <p className="mt-2">
                  <strong>Status:</strong>{" "}
                  {selectedApp.status}
                </p>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => updateStatus("Approved")}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus("Rejected")}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}