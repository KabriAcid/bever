import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MockRegister from "./client/pages/MockRegister";

// Lazy load both UserApp and AdminApp for code splitting
const UserApp = lazy(() => import("./client/UserApp"));
const AdminApp = lazy(() => import("./admin/AdminApp"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <span className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-black rounded-full"></span>
          </div>
        }
      >
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/mock-register" element={<MockRegister />} />
          <Route path="/*" element={<UserApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
