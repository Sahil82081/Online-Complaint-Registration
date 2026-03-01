import { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../Provider/StateProvider";
import {
  get_all_complaints,
  update_complaint_status,
} from "../url/url";
import { useNavigate } from "react-router-dom";
/* ================= STATUS COLOR ================= */
const statusColor = (status) => {
  if (status === "Submitted") return "bg-yellow-100 text-yellow-700";
  if (status === "In Process") return "bg-blue-100 text-blue-700";
  if (status === "Resolved") return "bg-green-100 text-green-700";
  if (status === "Rejected") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-700";
};

export default function OfficerDashboard() {
  const { token } = useStateContext();
const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  // Reject
  const [rejectId, setRejectId] = useState(null);
  const [rejectRemark, setRejectRemark] = useState("");

  // Resolve
  const [resolveId, setResolveId] = useState(null);
  const [proofFile, setProofFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // View proof
  const [viewProof, setViewProof] = useState(null);

  /* ================= FETCH COMPLAINTS ================= */
  const fetchComplaints = async () => {
    try {
      const res = await axios.get(get_all_complaints, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.complaints);
      setComplaints(res.data.complaints || []);
    } catch (error) {
      console.error("Error fetching complaints", error);
    }
  };

  useEffect(() => {
    if (token) fetchComplaints();
  }, [token]);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async ({
    id,
    status,
    remark = "",
    img_of_proof = null,
  }) => {
    try {
      const formData = new FormData();
      formData.append("status", status);

      if (remark) formData.append("remark", remark);
      if (img_of_proof) formData.append("img_of_proof", img_of_proof);

      const res = await axios.patch(
        `${update_complaint_status}/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedComplaint = res.data.complaint;

      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? updatedComplaint : c))
      );
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Status update failed");
    }
  };

  /* ================= REJECT ================= */
  const confirmReject = () => {
    if (!rejectRemark.trim()) {
      alert("Remark is required");
      return;
    }

    updateStatus({
      id: rejectId,
      status: "Rejected",
      remark: rejectRemark,
    });

    setRejectId(null);
    setRejectRemark("");
  };

  /* ================= RESOLVE ================= */
  const submitResolve = () => {
    if (!proofFile) {
      alert("Please upload proof image");
      return;
    }

    updateStatus({
      id: resolveId,
      status: "Resolved",
      img_of_proof: proofFile,
    });

    setResolveId(null);
    setProofFile(null);
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Officer Dashboard</h1>
        <button
          onClick={() => {
            localStorage.clear();
            navigate('/')
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* COMPLAINT LIST */}
      <div className="space-y-6">
        {complaints.map((c) => (
          <div
            key={c._id}
            className="bg-white rounded-lg shadow p-4 flex gap-4"
          >
            {/* IMAGE */}
            <img
              src={c.img_of_problem}
              alt="complaint"
              className="w-36 h-36 object-cover rounded border"
            />

            <div className="flex-1">
              {/* TITLE + ID */}
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">{c.title}</h2>
                <span className="text-sm text-gray-500">
                  ID: {c.complaint_id}
                </span>
              </div>

              {/* USER + TIME */}
              <div className="text-sm text-gray-500 mb-2">
                <b>{c.userId?.fullname}</b> •{" "}
                {new Date(c.createdAt).toLocaleString()}
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-sm mb-2">
                {c.description}
              </p>

              {/* STATUS */}
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                  c.status
                )}`}
              >
                {c.status}
              </span>

              {/* REMARK */}
              {c.remark && (
                <p className="text-red-600 text-sm mt-2">
                  Remark: {c.remark}
                </p>
              )}

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-4">
                {c.status === "Submitted" && (
                  <>
                    <button
                      onClick={() =>
                        updateStatus({
                          id: c._id,
                          status: "In Process",
                        })
                      }
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      In Process
                    </button>

                    <button
                      onClick={() => setRejectId(c._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Reject
                    </button>
                  </>
                )}

                {c.status === "In Process" && (
                  <button
                    onClick={() => setResolveId(c._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Resolve
                  </button>
                )}

                {c.status === "Resolved" && c.img_of_proof && (
                  <button
                    onClick={() => setViewProof(c.img_of_proof)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded"
                  >
                    View Proof
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= REJECT MODAL ================= */}
      {rejectId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">Reject Complaint</h2>

            <textarea
              className="w-full border p-2 rounded mb-4"
              rows="4"
              placeholder="Enter rejection remark"
              value={rejectRemark}
              onChange={(e) => setRejectRemark(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRejectId(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= RESOLVE MODAL ================= */}
      {resolveId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">
              Upload Resolution Proof
            </h2>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setProofFile(file);
                setPreview(URL.createObjectURL(file));
              }}
            />

            {preview && (
              <img
                src={preview}
                className="w-full h-40 object-cover rounded mt-4"
              />
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setResolveId(null);
                  setPreview(null);
                  setProofFile(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitResolve}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW PROOF ================= */}
      {viewProof && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96 relative">
            <button
              onClick={() => setViewProof(null)}
              className="absolute top-2 right-3 text-xl"
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-3">
              Resolution Proof
            </h2>
            <img src={viewProof} className="w-full rounded border" />
          </div>
        </div>
      )}
    </div>
  );
}
