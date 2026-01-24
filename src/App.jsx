import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserLogin from "../Pages/UserLogin";
import UserDashboard from "../Pages/UserDashboard";
import OfficerLogin from "../Pages/OfficerLogin";
import OfficerDashboard from "../Pages/OfficerDashboard";
import AdminLogin from "../Pages/AdminLogin";
import AdminDashboard from "../Pages/AdminDashboard";
import HomePage from "../Pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />

        <Route path="/officer-login" element={<OfficerLogin />} />
        <Route path="/officer-dashboard" element={<OfficerDashboard />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
