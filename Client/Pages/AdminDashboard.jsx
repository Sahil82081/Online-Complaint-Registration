import { useEffect, useState } from "react";
import axios from "axios";
import { addofficer, getAdminDashboard } from "../url/url";
import { useStateContext } from '../Provider/StateProvider'
import { useNavigate } from 'react-router-dom'
export default function AdminDashboard() {
  const { token } = useStateContext();
  const navigate = useNavigate();

  /* ================= USERS ================= */
  const [users, setUser] = useState([]);

  /* ================= OFFICERS ================= */
  const [officers, setOfficers] = useState([]);

  /* ================= COMPLAINTS ================= */
  const [complaints, setComplaints] = useState([]);

  /* ================= WEBSITE CONTENT ================= */
  const [content, setContent] = useState({
    notice: "Welcome to Online Complaint Registration System",
    contact: "help@complaint.gov.in",
  });

  const getAlladmindata = async (token) => {
    const res = await axios.get(getAdminDashboard, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(res.data);
    setComplaints(res.data.complaints);
    setOfficers(res.data.officer);
    setUser(res.data.users);
  }
  useEffect(() => {
    getAlladmindata(token)
  }, [token])

  /* ================= CREATE OFFICER ================= */
  const [newOfficer, setNewOfficer] = useState({
    name: "",
    username: "",
    password: "",
  });

  /* ================= MODAL ================= */
  const [modalType, setModalType] = useState(null); // "remark" | "proof"
  const [modalData, setModalData] = useState("");

  /* ================= FUNCTIONS ================= */
  const addOfficer = async () => {

    if (!newOfficer.name || !newOfficer.username || !newOfficer.password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post(addofficer, newOfficer,
        { headers: { Authorization: `Bearer ${token}` } });
      console.log(res.data);
      setOfficers((prev) => [...prev, res.data.officer]);
    } catch (error) {
      console.log(error)
    }
    setNewOfficer({ name: "", username: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() => {
            localStorage.clear()
            navigate("/")
          }}>
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
                <td className="p-2">{u._id}</td>
                <td className="p-2">{u.fullname}</td>
                <td className="p-2">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ================= MANAGE COMPLAINTS ================= */}
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
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c) => {
              const user = c.userId;
              const officer = c.officer;

              return (
                <tr key={c._id} className="border-t text-center">
                  <td className="p-2 font-semibold">{c.complaint_id}</td>

                  <td className="p-2">
                    <p className="font-medium">{user?.fullname}</p>
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

                  <td className="p-2 space-x-2">
                    {/* View Complaint Image - ALWAYS VISIBLE */}
                    <button
                      onClick={() => {
                        setModalType("image");
                        setModalData(c.img_of_problem);
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      View Image
                    </button>

                    {c.status === "Rejected" && (
                      <button
                        onClick={() => {
                          setModalType("remark");
                          setModalData(c.remark);
                        }}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Remark
                      </button>
                    )}

                    {c.status === "Resolved" && (
                      <button
                        onClick={() => {
                          setModalType("proof");
                          setModalData(c.img_of_proof);
                        }}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Proof
                      </button>
                    )}
                  </td>
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

      {/* ================= CREATE OFFICER ================= */}
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

      {/* ================= MODAL ================= */}
      {modalType && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96 relative">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-2 right-3 text-xl"
            >
              ✕
            </button>

            {/* REMARK */}
            {modalType === "remark" && (
              <>
                <h2 className="text-lg font-bold mb-3">Rejection Remark</h2>
                <p className="bg-gray-100 p-4 rounded text-gray-700">
                  {modalData}
                </p>
              </>
            )}

            {/* PROOF */}
            {modalType === "proof" && (
              <>
                <h2 className="text-lg font-bold mb-3">Resolution Proof</h2>
                <img
                  src={modalData}
                  alt="Proof"
                  className="w-full rounded border"
                />
              </>
            )}

            {/* COMPLAINT IMAGE */}
            {modalType === "image" && (
              <>
                <h2 className="text-lg font-bold mb-3">Complaint Image</h2>
                <img
                  src={modalData}
                  alt="Complaint"
                  className="w-full rounded border"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
