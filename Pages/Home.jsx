export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {/* ================= HEADER ================= */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Online Complaint Registration System
        </h1>

        <div className="space-x-3">
          <button className="bg-white text-blue-600 px-4 py-1 rounded">
            Login
          </button>
          <button className="bg-white text-blue-600 px-4 py-1 rounded">
            Register
          </button>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 w-full max-w-4xl">

          {/* Register Complaint */}
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-lg font-semibold mb-2">
              Register Complaint
            </h2>
            <p className="text-gray-600 mb-4">
              Submit your complaint easily online
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Register Complaint
            </button>
          </div>

          {/* View Complaint Status */}
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-lg font-semibold mb-2">
              View Complaint Status
            </h2>
            <p className="text-gray-600 mb-4">
              Track your complaint using Complaint ID
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              View Status
            </button>
          </div>

          {/* Search Complaint */}
          <div className="bg-white p-6 rounded shadow text-center md:col-span-2">
            <h2 className="text-lg font-semibold mb-2">
              Search Complaint
            </h2>
            <p className="text-gray-600 mb-4">
              Search complaint by ID or keyword
            </p>

            <div className="flex gap-3 justify-center">
              <input
                type="text"
                placeholder="Enter Complaint ID"
                className="border p-2 rounded w-1/2"
              />
              <button className="bg-purple-600 text-white px-4 rounded">
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
