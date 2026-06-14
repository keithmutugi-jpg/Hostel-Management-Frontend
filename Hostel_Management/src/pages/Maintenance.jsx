import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function Maintenance() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      issue: "Broken bed frame",
      status: "Pending",
    },
    {
      id: 2,
      issue: "Leaking sink",
      status: "In Progress",
    },
  ]);

  const [issue, setIssue] = useState("");

  const submitRequest = (e) => {
    e.preventDefault();

    if (!issue) return;

    const newRequest = {
      id: Date.now(),
      issue,
      status: "Pending",
    };

    setRequests([newRequest, ...requests]);
    setIssue("");
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">

          <h1 className="text-3xl font-bold mb-6">
            Maintenance Requests
          </h1>

          {/* FORM */}
          <form
            onSubmit={submitRequest}
            className="bg-white p-4 rounded shadow mb-6"
          >
            <h2 className="text-lg font-semibold mb-2">
              Submit New Request
            </h2>

            <input
              type="text"
              placeholder="Describe the issue..."
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="w-full border p-3 rounded mb-3"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>

          {/* LIST */}
          <div className="grid grid-cols-2 gap-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-white p-4 rounded shadow"
              >
                <h3 className="font-bold">
                  {req.issue}
                </h3>

                <p className="mt-2">
                  Status:
                  <span
                    className={`ml-2 font-bold ${
                      req.status === "Resolved"
                        ? "text-green-600"
                        : req.status === "In Progress"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {req.status}
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