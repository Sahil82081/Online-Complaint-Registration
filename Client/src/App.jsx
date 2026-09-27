import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserLogin from "../Pages/UserLogin";
import UserDashboard from "../Pages/UserDashboard";
import OfficerLogin from "../Pages/OfficerLogin";
import OfficerDashboard from "../Pages/OfficerDashboard";
import AdminLogin from "../Pages/AdminLogin";
import AdminDashboard from "../Pages/AdminDashboard";
import HomePage from "../Pages/Home";
import UserRegister from "../Pages/UserRegister";
import ComplaintStatus from "../Pages/ComplaintStatus";

import { StateProvider } from "../Provider/StateProvider";
import ProtectedRoute from "../Components/ProtectedRoute";

function App() {
  return (
    <StateProvider>
      <Router>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/complaint-status/:id"
            element={<ComplaintStatus />}
          />

          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-register" element={<UserRegister />} />

          <Route path="/officer-login" element={<OfficerLogin />} />

          <Route path="/admin-login" element={<AdminLogin />} />

          {/* User Protected Route */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Officer Protected Route */}
          <Route
            path="/officer-dashboard"
            element={
              <ProtectedRoute role="officer">
                <OfficerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Route */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </StateProvider>
  );
}

export default App;