import React, { useState } from 'react';
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Card from "../components/ui/Card";

export default function StudentDashboard() {
  // Student workflow states
  const [appStatus, setAppStatus] = useState('Approved'); // Mocking 'Approved' so the M-Pesa button triggers
  const [selectedType, setSelectedType] = useState('all');
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [maintenanceIssue, setMaintenanceIssue] = useState('');
  const [maintenanceCategory, setMaintenanceCategory] = useState('Plumbing / Leakage');

  // Room data matching your application structure
  const rooms = [
    { id: 1, type: 'single', price: 'Ksh 15,000', status: 'Available', accent: 'teal' },
    { id: 2, type: 'double', price: 'Ksh 10,000', status: 'Available', accent: 'indigo' },
    { id: 3, type: 'ensuite', price: 'Ksh 22,000', status: 'Available', accent: 'coral' },
  ];

  const handleMpesaPay = (e) => {
    e.preventDefault();
    alert(`STK Push Prompt sent to ${phone} for Hostel Fees.`);
    setAppStatus('Paid');
    setShowMpesaModal(false);
  };

  const handleMaintenanceSubmit = (e) => {
    e.preventDefault();
    alert(`Logged maintenance for ${maintenanceCategory}: "${maintenanceIssue}". Dispatched to Eric (Admin).`);
    setMaintenanceIssue('');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        <Navbar />

        <main className="p-4 md:p-8">
          {/* Main Welcome Hero */}
          <section className="mb-6 rounded-xl bg-slate-950 px-5 py-6 text-white shadow-2xl shadow-slate-300/70 md:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">
              Student portal
            </p>
            <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h1 className="text-3xl font-black tracking-tight md:text-5xl">
                  Hostel Command Center
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                  Secure your room allocation, process semester fee vouchers, and issue immediate service maintenance requests.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 flex flex-col items-center">
                <p className="text-xs text-slate-300">Application Status</p>
                <span className={`mt-1 px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                  appStatus === 'Pending' ? 'bg-amber-500 text-white' :
                  appStatus === 'Approved' ? 'bg-teal-500 text-white animate-pulse' : 'bg-indigo-600 text-white'
                }`}>
                  {appStatus}
                </span>
              </div>
            </div>
          </section>

          {/* Quick Stats Grid using your structure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Card title="My Allocated Room" value={appStatus === 'Paid' ? "Room 204B" : "None"} accent="teal" />
            <Card title="Fee Ledger Balance" value={appStatus === 'Paid' ? "Ksh 0" : "Ksh 15,000"} accent="indigo" />
            <Card title="My Open Requests" value="1" accent="coral" />
          </div>

          {/* Core Content Area */}
          <section className="mt-6 grid gap-6 md:grid-cols-[1.3fr_0.9fr]">
            
            {/* Room Browsing Grid & M-Pesa Flow */}
            <div className="rounded-xl border border-white bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6">
                <h2 className="text-xl font-black tracking-tight text-slate-950">
                  Available Accommodations
                </h2>
                <select 
                  className="border border-slate-200 rounded-lg p-2 text-sm bg-white text-slate-700 outline-none focus:border-teal-500"
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Variations</option>
                  <option value="single">Single Room</option>
                  <option value="double">Double Room</option>
                  <option value="ensuite">Ensuite Room</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {rooms.filter(r => selectedType === 'all' || r.type === selectedType).map(room => (
                  <div key={room.id} className="flex justify-between items-center border border-slate-100 bg-slate-50 p-4 rounded-xl hover:bg-slate-100/50 transition">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{room.type} room</span>
                      <p className="text-lg font-black text-slate-950">{room.price}<span className="text-xs font-normal text-slate-500">/sem</span></p>
                    </div>
                    <button 
                      onClick={() => alert("Application submitted to Jaden Afrika (Backend Blueprint).")}
                      className="bg-slate-950 text-white px-4 py-2 rounded-lg text-xs font-bold tracking-wide hover:bg-slate-800 transition shadow-sm"
                    >
                      Book Room
                    </button>
                  </div>
                ))}
              </div>

              {/* Dynamic M-Pesa Module based on application context state */}
              {appStatus === 'Approved' && (
                <div className="mt-6 rounded-xl border-2 border-dashed border-teal-500 bg-teal-50/50 p-4 text-center">
                  <p className="text-sm font-bold text-teal-950">Your allocation was approved by Eric Masila!</p>
                  <p className="text-xs text-slate-500 mb-3">Clear your balance via Lipa na M-Pesa online instant portal prompt.</p>
                  <button 
                    onClick={() => setShowMpesaModal(true)}
                    className="bg-teal-500 text-white text-xs font-black uppercase tracking-wider px-6 py-2.5 rounded-lg hover:bg-teal-600 shadow transition"
                  >
                    Trigger M-Pesa Receipt
                  </button>
                </div>
              )}
            </div>

            {/* Interactive Maintenance Request Board */}
            <div className="rounded-xl border border-white bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-6 flex flex-col justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                  File Service Ticket
                </p>
                <form onSubmit={handleMaintenanceSubmit} className="mt-4 space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-600">Category</label>
                    <select 
                      className="w-full mt-1 border border-slate-200 rounded-lg p-2 text-xs bg-white"
                      value={maintenanceCategory}
                      onChange={(e) => setMaintenanceCategory(e.target.value)}
                    >
                      <option>Plumbing / Leakage</option>
                      <option>Electrical / Lighting</option>
                      <option>Furniture / Structural</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600">Observation Notes</label>
                    <textarea 
                      required
                      className="w-full mt-1 border border-slate-200 rounded-lg p-2 text-xs h-20 resize-none outline-none focus:border-indigo-500"
                      placeholder="Specify broken items or room faults..."
                      value={maintenanceIssue}
                      onChange={(e) => setMaintenanceIssue(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="w-full bg-slate-950 text-white text-xs font-bold py-2 rounded-lg hover:bg-slate-800 transition shadow-sm">
                    Log Service Request
                  </button>
                </form>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Logs</p>
                <div className="mt-2 flex justify-between items-center text-xs">
                  <span className="text-slate-700 font-medium">Water heater replacement</span>
                  <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">In Progress</span>
                </div>
              </div>
            </div>

          </section>
        </main>
      </div>

      {/* M-Pesa STK Prompt Backdrop Modal */}
      {showMpesaModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-black text-slate-950 tracking-tight">Lipa na M-Pesa Checkout</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Provide valid SafariCom parameters to initiate the API push window terminal prompt.</p>
            <form onSubmit={handleMpesaPay} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600">Mobile Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="e.g. 0712345678" 
                  required 
                  className="mt-1 w-full p-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100" 
                  onChange={e => setPhone(e.target.value)} 
                />
              </div>
              <div className="flex gap-3 justify-end text-xs font-bold">
                <button type="button" onClick={() => setShowMpesaModal(false)} className="px-3 py-2 text-slate-400 hover:text-slate-600">Abort</button>
                <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition shadow-md">Push Pin Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}