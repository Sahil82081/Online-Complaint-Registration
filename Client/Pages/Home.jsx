import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [complaintId, setComplaintId] = useState("");

  const handleSearch = () => {
    if (!complaintId.trim()) {
      alert("Please enter Complaint ID");
      return;
    }
    navigate(`/complaint-status/${complaintId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {/* ================= HEADER ================= */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-semibold">
          Online Complaint Registration System
        </h1>

        <div className="space-x-3">
          <button
            className="bg-gray-600 hover:bg-gray-500 px-4 py-1 rounded"
            onClick={() => navigate("/user-login")}
          >
            Login
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded"
            onClick={() => navigate("/user-register")}
          >
            Register
          </button>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 w-full max-w-4xl">

          {/* Register Complaint */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Register Complaint
            </h2>
            <p className="text-gray-600 mb-4">
              Submit your complaint easily online
            </p>
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
              onClick={() => navigate("/user-login")}
            >
              Register Complaint
            </button>
          </div>

          {/* View Complaint Status */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              View Complaint Status
            </h2>
            <p className="text-gray-600 mb-4">
              Track your complaint using Complaint ID
            </p>
            <button
              className="bg-gray-800 hover:bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => navigate("/user-login")}
            >
              View Status
            </button>
          </div>

          {/* Search Complaint */}
          <div className="bg-white p-6 rounded-lg shadow text-center md:col-span-2">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Search Complaint
            </h2>
            <p className="text-gray-600 mb-4">
              Search complaint by Complaint ID
            </p>

            <div className="flex gap-3 justify-center">
              <input
                type="text"
                placeholder="Enter Complaint ID"
                value={complaintId}
                onChange={(e) => setComplaintId(e.target.value)}
                className="border border-gray-300 p-2 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 rounded"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-800 text-white text-center p-3">
        © 2026 Online Complaint Registration System
      </footer>
    </div>
  );
}
