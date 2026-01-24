import { useState } from "react";

export default function AdminDashboard() {

  /* ================= USERS ================= */
  const [users] = useState([
    { id: 1, name: "Rahul Patil", email: "rahul@gmail.com" },
    { id: 2, name: "Sneha Joshi", email: "sneha@gmail.com" },
    { id: 3, name: "Amit Kulkarni", email: "amit@gmail.com" },
  ]);

  /* ================= OFFICERS ================= */
  const [officers, setOfficers] = useState([
    { id: 1, name: "Officer A", username: "officer_a", password: "officer@123" },
    { id: 2, name: "Officer B", username: "officer_b", password: "officer@456" },
  ]);

  /* ================= COMPLAINTS ================= */
  const [complaints] = useState([
    {
      id: "CMP001",
      title: "Road Damage",
      description: "Large potholes near main road",
      userId: 1,
      officerId: 1,
      status: "In Process",
    },
    {
      id: "CMP002",
      title: "Water Leakage",
      description: "Pipeline leaking continuously",
      userId: 2,
      officerId: 2,
      status: "Completed",
    },
    {
      id: "CMP003",
      title: "Street Light Issue",
      description: "Street light not working",
      userId: 3,
      officerId: null,
      status: "Submitted",
    },
  ]);

  /* ================= WEBSITE CONTENT ================= */
  const [content, setContent] = useState({
    notice: "Welcome to Online Complaint Registration System",
    contact: "help@complaint.gov.in",
  });

  /* ================= CREATE OFFICER ================= */
  const [newOfficer, setNewOfficer] = useState({
    name: "",
    username: "",
    password: "",
  });

  const addOfficer = () => {
    if (!newOfficer.name || !newOfficer.username || !newOfficer.password) {
      alert("All fields are required");
      return;
    }
    setOfficers([...officers, { id: Date.now(), ...newOfficer }]);
    setNewOfficer({ name: "", username: "", password: "" });
  };

  const getUser = (id) => users.find((u) => u.id === id);
  const getOfficer = (id) => officers.find((o) => o.id === id);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <button
          onClick={()=>{}}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>

      </div>

      {/* ================= MANAGE USERS ================= */}
      <section className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Manage Users</h2>
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">User ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t text-center">
                <td className="p-2">{u.id}</td>
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ================= COMPLAINT TRACKING ================= */}
      <section className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Manage Complaints (User → Officer)
        </h2>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Complaint ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Complaint</th>
              <th className="p-2">Officer</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c) => {
              const user = getUser(c.userId);
              const officer = getOfficer(c.officerId);

              return (
                <tr key={c.id} className="border-t text-center">
                  <td className="p-2 font-semibold">{c.id}</td>

                  <td className="p-2">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </td>

                  <td className="p-2">
                    <p className="font-medium">{c.title}</p>
                    <p className="text-sm text-gray-500">{c.description}</p>
                  </td>

                  <td className="p-2">
                    {officer ? (
                      <>
                        <p className="font-medium">{officer.name}</p>
                        <p className="text-sm text-gray-500">
                          ({officer.username})
                        </p>
                      </>
                    ) : (
                      <span className="text-red-500 font-medium">
                        Not Assigned
                      </span>
                    )}
                  </td>

                  <td className="p-2 font-semibold">{c.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* ================= MANAGE WEBSITE CONTENT ================= */}
      <section className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Manage Website Content</h2>

        <input
          className="border p-2 w-full mb-2 rounded"
          value={content.notice}
          onChange={(e) =>
            setContent({ ...content, notice: e.target.value })
          }
        />

        <input
          className="border p-2 w-full rounded"
          value={content.contact}
          onChange={(e) =>
            setContent({ ...content, contact: e.target.value })
          }
        />
      </section>

      {/* ================= CREATE OFFICER ACCOUNT ================= */}
      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">
          Create Account For Officials
        </h2>

        <table className="w-full border mb-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Officer Name</th>
              <th className="p-2">Username</th>
              <th className="p-2">Password</th>
            </tr>
          </thead>
          <tbody>
            {officers.map((o) => (
              <tr key={o.id} className="border-t text-center">
                <td className="p-2">{o.name}</td>
                <td className="p-2">{o.username}</td>
                <td className="p-2">{o.password}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex gap-3">
          <input
            className="border p-2 rounded w-1/4"
            placeholder="Officer Name"
            value={newOfficer.name}
            onChange={(e) =>
              setNewOfficer({ ...newOfficer, name: e.target.value })
            }
          />
          <input
            className="border p-2 rounded w-1/4"
            placeholder="Username"
            value={newOfficer.username}
            onChange={(e) =>
              setNewOfficer({ ...newOfficer, username: e.target.value })
            }
          />
          <input
            className="border p-2 rounded w-1/4"
            placeholder="Password"
            value={newOfficer.password}
            onChange={(e) =>
              setNewOfficer({ ...newOfficer, password: e.target.value })
            }
          />
          <button
            onClick={addOfficer}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Create
          </button>
        </div>
      </section>
    </div>
  );
}
