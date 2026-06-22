import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/useAuth"; 
import { API_BASE_URL } from "../config/api";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Card from "../components/ui/Card";

export default function Dashboard() {
  const { token } = useAuth(); 

  // Core Data States
  const [rooms, setRooms] = useState([]);
  const [appStatus, setAppStatus] = useState('Approved'); 
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);

  // M-Pesa Interactive States
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [paymentState, setPaymentState] = useState('idle'); // 'idle' | 'waiting' | 'completed' | 'failed'
  const [checkoutRequestId, setCheckoutRequestId] = useState(null);

  // Maintenance States
  const [maintenanceIssue, setMaintenanceIssue] = useState('');
  const [maintenanceCategory, setMaintenanceCategory] = useState('Plumbing / Leakage');
  const [recentLogs, setRecentLogs] = useState([
    { id: 1, title: "Water heater replacement", status: "In Progress" },
    { id: 2, title: "Broken window pane latch", status: "Closed" }
  ]);

  // Fetch Rooms dynamically on Mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/students/rooms`, {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok && Array.isArray(data)) {
          setRooms(data);
        }
      } catch (err) {
        console.error("Error connecting to backend rooms system:", err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchRooms();
  }, [token]);

  // Extract unique room types dynamically from the active data set
  const uniqueRoomTypes = ['all', ...new Set(rooms.map(room => room?.type?.toLowerCase() || room?.room_type?.toLowerCase()))].filter(Boolean);

  // Handle Room Booking Submission with Smart Routing Sweep
  const handleBookRoom = async (roomId) => {
    try {
      const potentialAppPaths = [
        "/students/applications",
        "/applications",
        "/api/v1/students/applications",
        "/rooms/book"
      ];

      let response = null;
      let data = null;

      for (const path of potentialAppPaths) {
        try {
          console.log(`Trying Booking endpoint: ${API_BASE_URL}${path}`);
          const res = await fetch(`${API_BASE_URL}${path}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ room_id: roomId })
          });

          if (res.status !== 404) {
            response = res;
            if (res.status !== 204) data = await res.json();
            console.log(`Successfully reached booking endpoint: ${path}`);
            break;
          }
        } catch (err) {
          console.error(`Failed connection on booking path ${path}:`, err);
        }
      }

      if (response && response.ok) {
        alert("Application successfully transmitted to backend system!");
        setAppStatus("Pending");
      } else {
        console.error("Booking sweep failed entirely. Final response status:", response?.status, data);
        alert("Server reached but could not assign slot. Check browser dev logs.");
      }
    } catch (err) {
      alert("Could not process booking allocation.");
    }
  };

  // Trigger M-Pesa STK Push Prompt with Smart Routing Sweep
  const handleMpesaPay = async (e) => {
    e.preventDefault();
    setPaymentState('waiting');
    
    const potentialPaths = [
      "/students/payments/stk-push",
      "/payments/stk-push",
      "/api/v1/students/payments/stk-push",
      "/mpesa/stk-push"
    ];

    let response = null;
    let data = null;

    for (const path of potentialPaths) {
      try {
        console.log(`Trying M-Pesa endpoint: ${API_BASE_URL}${path}`);
        const res = await fetch(`${API_BASE_URL}${path}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ phone_number: phone, amount: 15000 })
        });

        if (res.status !== 404) {
          response = res;
          data = await res.json();
          console.log(`Successfully reached M-Pesa endpoint: ${path}`);
          break;
        }
      } catch (err) {
        console.error(`Failed connection on path ${path}:`, err);
      }
    }
    
    if (response && response.ok && data?.CheckoutRequestID) {
      setCheckoutRequestId(data.CheckoutRequestID);
    } else {
      console.error("M-Pesa payment sweep failed entirely. Final response:", data);
      setPaymentState('failed');
    }
  };

  // Async Interval Loop: Polls backend to verify M-Pesa callback status changes
  useEffect(() => {
    let timer;
    if (paymentState === 'waiting' && checkoutRequestId) {
      timer = setInterval(async () => {
        try {
          let response = await fetch(`${API_BASE_URL}/payments/status/${checkoutRequestId}`, {
            headers: { "Authorization": `Bearer ${token}` }
          });

          if (response.status === 404) {
            response = await fetch(`${API_BASE_URL}/students/payments/status/${checkoutRequestId}`, {
              headers: { "Authorization": `Bearer ${token}` }
            });
          }

          const data = await response.json();
          
          if (response.ok) {
            if (data.status === 'Completed') {
              setPaymentState('completed');
              setAppStatus('Paid');
              clearInterval(timer);
              setTimeout(() => setShowMpesaModal(false), 2000); 
            } else if (data.status === 'Failed') {
              setPaymentState('failed');
              clearInterval(timer);
            }
          }
        } catch (err) {
          console.error("Polling error tracing payment callback pipeline:", err);
        }
      }, 4000); 
    }
    return () => clearInterval(timer);
  }, [paymentState, checkoutRequestId, token]);

  // Submit Maintenance Ticket
  const handleMaintenanceSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/students/maintenance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ category: maintenanceCategory, description: maintenanceIssue })
      });
      if (response.ok) {
        setRecentLogs([{ id: Date.now(), title: maintenanceIssue, status: "Open" }, ...recentLogs]);
        setMaintenanceIssue('');
        alert("Maintenance request sent with status 'Open'!");
      }
    } catch (err) {
      alert("Could not log maintenance request.");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        <Navbar />
        <main className="p-4 md:p-8">
          
          <section className="mb-6 rounded-xl bg-slate-950 px-5 py-6 text-white shadow-2xl shadow-slate-300/70 md:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Student portal</p>
            <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h1 className="text-3xl font-black tracking-tight md:text-5xl">Dashboard Overview</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                  Track room availability, student activity, and service requests from one clean command center.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-center">
                <p className="text-xs text-slate-300">Application Status</p>
                <p className="text-xl font-black text-teal-300 uppercase tracking-wide mt-0.5">{appStatus}</p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Card title="My Allocated Room" value={appStatus === 'Paid' ? "Room 204B" : "None"} accent="teal" />
            <Card title="Fee Ledger Balance" value={appStatus === 'Paid' ? "Ksh 0" : "Ksh 15,000"} accent="indigo" />
            <Card title="Open Requests" value={recentLogs.filter(l => l.status !== 'Closed' && l.status !== 'Resolved').length.toString()} accent="coral" />
          </div>

          <section className="mt-6 grid gap-6 md:grid-cols-[1.3fr_0.9fr]">
            <div className="rounded-xl border border-white bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6">
                <h2 className="text-xl font-black tracking-tight text-slate-950">Accommodations</h2>
                
                <select 
                  className="border border-slate-200 rounded-lg p-2 text-sm bg-white text-slate-700 outline-none focus:border-teal-500 capitalize"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {uniqueRoomTypes.map(type => (
                    <option key={type} value={type}>{type === 'all' ? 'All Variations' : `${type} Room`}</option>
                  ))}
                </select>
              </div>

              {loading ? (
                <p className="text-sm text-slate-500">Querying live data records...</p>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {rooms.length === 0 ? (
                    <div className="flex justify-between items-center border border-slate-100 bg-slate-50 p-4 rounded-xl hover:bg-slate-100/50 transition">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Single Suite (Development Mock)</span>
                        <p className="text-lg font-black text-slate-950">Ksh 15,000<span className="text-xs font-normal text-slate-500">/sem</span></p>
                      </div>
                      <button 
                        onClick={() => handleBookRoom(1)}
                        className="bg-slate-950 text-white px-4 py-2 rounded-lg text-xs font-bold tracking-wide hover:bg-slate-800 transition"
                      >
                        Book Room
                      </button>
                    </div>
                  ) : (
                    rooms.filter(r => selectedType === 'all' || (r.type || r.room_type)?.toLowerCase() === selectedType).map(room => (
                      <div key={room.id} className="flex justify-between items-center border border-slate-100 bg-slate-50 p-4 rounded-xl hover:bg-slate-100/50 transition">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 capitalize">{room.type || room.room_type} Layout</span>
                          <p className="text-lg font-black text-slate-950">Ksh {room.price || room.cost}<span className="text-xs font-normal text-slate-500">/sem</span></p>
                        </div>
                        <button 
                          onClick={() => handleBookRoom(room.id)}
                          className="bg-slate-950 text-white px-4 py-2 rounded-lg text-xs font-bold tracking-wide hover:bg-slate-800 transition"
                        >
                          Book Room
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {appStatus === 'Approved' && (
                <div className="mt-6 rounded-xl border-2 border-dashed border-teal-500 bg-teal-50/50 p-4 text-center">
                  <p className="text-sm font-bold text-teal-950">Allocation structural validation completed.</p>
                  <button 
                    onClick={() => { setShowMpesaModal(true); setPaymentState('idle'); }}
                    className="mt-3 bg-teal-500 text-white text-xs font-black uppercase tracking-wider px-6 py-2.5 rounded-lg hover:bg-teal-600 transition"
                  >
                    Pay Hostel Balance via M-Pesa
                  </button>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-white bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-6 flex flex-col justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">File Service Ticket</p>
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
                      placeholder="Specify issues..."
                      value={maintenanceIssue}
                      onChange={(e) => setMaintenanceIssue(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="w-full bg-slate-950 text-white text-xs font-bold py-2 rounded-lg hover:bg-slate-800 transition">
                    Log Service Request
                  </button>
                </form>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Track Status Pipelines</p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {recentLogs.map((log) => (
                    <div key={log.id} className="flex justify-between items-center text-xs p-1">
                      <span className="text-slate-700 truncate max-w-[150px] font-medium">{log.title}</span>
                      <span className={`px-2 py-0.5 rounded-full font-bold tracking-wide scale-90 ${
                        log.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                        log.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                        log.status === 'Resolved' ? 'bg-teal-100 text-teal-800' :
                        'bg-slate-200 text-slate-700'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </section>
        </main>
      </div>

      {showMpesaModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm border border-slate-100">
            <h3 className="text-lg font-black text-slate-950 tracking-tight">Lipa na M-Pesa Checkout</h3>
            
            {paymentState === 'idle' && (
              <form onSubmit={handleMpesaPay} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600">Mobile Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="e.g. 0712345678" 
                    required 
                    className="mt-1 w-full p-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-teal-500" 
                    onChange={e => setPhone(e.target.value)} 
                  />
                </div>
                <div className="flex gap-3 justify-end text-xs font-bold">
                  <button type="button" onClick={() => setShowMpesaModal(false)} className="px-3 py-2 text-slate-400">Abort</button>
                  <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition">Send STK Prompt</button>
                </div>
              </form>
            )}

            {paymentState === 'waiting' && (
              <div className="mt-6 text-center py-4 space-y-3">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
                <p className="text-sm font-bold text-slate-800">Waiting for phone confirmation...</p>
                <p className="text-xs text-slate-400">Please check your mobile phone and key in your M-Pesa PIN.</p>
              </div>
            )}

            {paymentState === 'completed' && (
              <div className="mt-6 text-center py-4 space-y-2 text-teal-600">
                <p className="text-lg font-black">✓ Payment Confirmed</p>
                <p className="text-xs text-slate-500">Your allocation voucher has been cleared automatically.</p>
              </div>
            )}

            {paymentState === 'failed' && (
              <div className="mt-6 text-center py-4 space-y-3">
                <p className="text-lg font-black text-rose-600">⚠ Transaction Terminated</p>
                <button 
                  onClick={() => setPaymentState('idle')} 
                  className="bg-slate-950 text-white text-xs font-bold px-4 py-2 rounded-lg"
                >
                  Try Again
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}