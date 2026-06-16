import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Admin from "./pages/Admin";
import Maintenance from "./pages/Maintenance" 
import { MaintenanceProvider } from "./context/MaintenaceContext";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
     <MaintenanceProvider> {/*to wrap the pages so that the maintenace and admin have the same list */}
      <Routes>

        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/maintenance"
          element={
            <ProtectedRoute>
              <Maintenance />
            </ProtectedRoute>
          }
        />

        {/* 404 PAGE */}
        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
              <h1 className="rounded-xl border border-white/10 bg-white px-6 py-5 text-2xl font-black text-slate-950 shadow-2xl shadow-black/30">
                404 - Page Not Found
              </h1>
            </div>
          }
        />

      </Routes>
     </MaintenanceProvider> {/*to wrap the pages so that the maintenace and admin have the same list */}
    </BrowserRouter>
  );
}

export default App;
