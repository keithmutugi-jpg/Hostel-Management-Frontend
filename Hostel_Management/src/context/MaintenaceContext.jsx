import { createContext, useContext, useState } from "react";

const MaintenanceContext = createContext();

export function MaintenanceProvider({ children }) {
  const [requests, setRequests] = useState([
    { id: 1, issue: "Broken bed frame", status: "Pending" },
    { id: 2, issue: "Leaking sink", status: "In Progress" },
  ]);

  const addRequest = (issue) => {
    setRequests((prev) => [
      { id: Date.now(), issue, status: "Pending" },
      ...prev,
    ]);
    // TODO: POST /maintenance { issue }
  };

  const updateStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    // TODO: PATCH /maintenance/{id} { status }
  };

  return (
    <MaintenanceContext.Provider value={{ requests, addRequest, updateStatus }}>
      {children}
    </MaintenanceContext.Provider>
  );
}

export function useMaintenance() {
  return useContext(MaintenanceContext);
}