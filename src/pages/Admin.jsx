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
 
const initialMaintenance = [
  { id: 1, room: "A-110", issue: "Leaking tap in bathroom", status: "Open" },
  { id: 2, room: "B-204", issue: "Window latch broken", status: "In Progress" },
  { id: 3, room: "C-021", issue: "Power socket not working", status: "Open" },
];
 
const initialPayments = [
  { id: 1, name: "John Doe", term: "Term 2", amount: "KES 45,000", status: "Paid" },
  { id: 2, name: "Mary Wanjiku", term: "Term 2", amount: "KES 38,000", status: "Pending" },
  { id: 3, name: "Alex Kimani", term: "Term 2", amount: "KES 32,000", status: "Overdue" },
];
 
// Status pill colors — matches the amber pill used for "Pending" on applications
const STATUS_PILL = {
  Pending: "bg-amber-50 text-amber-700",
  Approved: "bg-teal-50 text-teal-700",
  Rejected: "bg-rose-50 text-rose-700",
  Open: "bg-rose-50 text-rose-700",
  "In Progress": "bg-amber-50 text-amber-700",
  Resolved: "bg-teal-50 text-teal-700",
  Paid: "bg-teal-50 text-teal-700",
  Overdue: "bg-rose-50 text-rose-700",
};
 
function StatusPill({ status }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_PILL[status] || "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
}
 
function SectionHeader({ eyebrow, title }) {
  return (
    <div className="mb-6">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600">
        {eyebrow}
      </p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
        {title}
      </h1>
    </div>
  );
}
 
export default function Admin() {
  const [applications, setApplications] = useState(initialApplications);
  const [maintenance, setMaintenance] = useState(initialMaintenance);
  const [payments] = useState(initialPayments);
 
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
 
  // -- Applications --
  const openAppModal = (app) => {
    setSelectedApp(app);
    setIsAppModalOpen(true);
  };
 
  const closeAppModal = () => {
    setSelectedApp(null);
    setIsAppModalOpen(false);
  };
 
  const updateAppStatus = (status) => {
    const updated = applications.map((app) =>
      app.id === selectedApp.id ? { ...app, status } : app
    );
    setApplications(updated);
    // TODO: PATCH /applications/{selectedApp.id} { status }
    closeAppModal();
  };
 
  // -- Maintenance --
  const openTicketModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsTicketModalOpen(true);
  };
 
  const closeTicketModal = () => {
    setSelectedTicket(null);
    setIsTicketModalOpen(false);
  };
 
  const updateTicketStatus = (status) => {
    const updated = maintenance.map((t) =>
      t.id === selectedTicket.id ? { ...t, status } : t
    );
    setMaintenance(updated);
    // TODO: PATCH /maintenance/{selectedTicket.id} { status }
    closeTicketModal();
  };
 
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
 
      <div className="flex-1 pb-20 md:pb-0">
        <Navbar />
 
        <main className="p-4 md:p-8">
          <SectionHeader eyebrow="Admissions" title="Application Review" />
 
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
                  <StatusPill status={app.status} />
                </div>
 
                <h2 className="text-lg font-black text-slate-950">{app.name}</h2>
                <p className="mt-1 text-sm text-slate-500">Room: {app.room}</p>
 
                <Button className="mt-5 w-full" onClick={() => openAppModal(app)}>
                  Review
                </Button>
              </div>
            ))}
          </div>
 
          {/* Maintenance */}
          <div className="mt-12">
            <SectionHeader eyebrow="Facilities" title="Maintenance Requests" />
 
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {maintenance.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-xl border border-white bg-white/90 p-5 shadow-xl shadow-slate-200/70"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-indigo-50 font-black text-indigo-700">
                      {ticket.room.slice(0, 1)}
                    </span>
                    <StatusPill status={ticket.status} />
                  </div>
 
                  <h2 className="text-lg font-black text-slate-950">{ticket.room}</h2>
                  <p className="mt-1 text-sm text-slate-500">{ticket.issue}</p>
 
                  <Button className="mt-5 w-full" onClick={() => openTicketModal(ticket)}>
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </div>
 
          {/* Payments */}
          <div className="mt-12">
            <SectionHeader eyebrow="Finance" title="Payment Reports" />
 
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {payments.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-white bg-white/90 p-5 shadow-xl shadow-slate-200/70"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-indigo-50 font-black text-indigo-700">
                      {p.name.slice(0, 1)}
                    </span>
                    <StatusPill status={p.status} />
                  </div>
 
                  <h2 className="text-lg font-black text-slate-950">{p.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{p.term} — {p.amount}</p>
                </div>
              ))}
            </div>
          </div>
 
          {/* Application Review Modal */}
          <Modal isOpen={isAppModalOpen} onClose={closeAppModal}>
            {selectedApp && (
              <div>
                <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-950">
                  Review Application
                </h2>
 
                <p className="text-slate-600"><strong>Name:</strong> {selectedApp.name}</p>
                <p className="text-slate-600"><strong>Room:</strong> {selectedApp.room}</p>
                <p className="mt-2 text-slate-600">
                  <strong>Status:</strong> {selectedApp.status}
                </p>
 
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => updateAppStatus("Approved")}
                    className="rounded-lg bg-teal-500 px-4 py-2 font-bold text-slate-950 hover:bg-teal-400"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateAppStatus("Rejected")}
                    className="rounded-lg bg-rose-500 px-4 py-2 font-bold text-white hover:bg-rose-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}
          </Modal>
 
          {/* Maintenance Review Modal */}
          <Modal isOpen={isTicketModalOpen} onClose={closeTicketModal}>
            {selectedTicket && (
              <div>
                <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-950">
                  Review Maintenance Request
                </h2>
 
                <p className="text-slate-600"><strong>Room:</strong> {selectedTicket.room}</p>
                <p className="text-slate-600"><strong>Issue:</strong> {selectedTicket.issue}</p>
                <p className="mt-2 text-slate-600">
                  <strong>Status:</strong> {selectedTicket.status}
                </p>
 
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => updateTicketStatus("Open")}
                    className="rounded-lg bg-rose-500 px-4 py-2 font-bold text-white hover:bg-rose-600"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => updateTicketStatus("In Progress")}
                    className="rounded-lg bg-amber-500 px-4 py-2 font-bold text-slate-950 hover:bg-amber-400"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => updateTicketStatus("Resolved")}
                    className="rounded-lg bg-teal-500 px-4 py-2 font-bold text-slate-950 hover:bg-teal-400"
                  >
                    Resolved
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
