import { useState } from "react";

export default function OfficerDashboard() {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Road Damage",
      description: "Large potholes causing traffic issues near main road.",
      image: "https://via.placeholder.com/150",
      status: "Submitted",
      remark: "",
    },
    {
      id: 2,
      title: "Water Leakage",
      description: "Continuous water leakage from pipeline since 3 days.",
      image: "https://via.placeholder.com/150",
      status: "Accepted",
      remark: "",
    },
  ]);

  const [rejectId, setRejectId] = useState(null);
  const [rejectRemark, setRejectRemark] = useState("");

  // Update status (Accept / In Process / Completed)
  const updateStatus = (id, newStatus) => {
    setComplaints(
      complaints.map((c) =>
        c.id === id ? { ...c, status: newStatus } : c
      )
    );
  };

  // Open reject modal
  const openRejectModal = (complaint) => {
    if (complaint.status !== "Submitted") {
      alert("Accepted or processed complaints cannot be rejected.");
      return;
    }
    setRejectId(complaint.id);
  };

  // Confirm rejection
  const confirmReject = () => {
    if (!rejectRemark.trim()) {
      alert("Remark is required to reject a complaint.");
      return;
    }

    setComplaints(
      complaints.map((c) =>
        c.id === rejectId
          ? { ...c, status: "Rejected", remark: rejectRemark }
          : c
      )
    );

    setRejectRemark("");
    setRejectId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">
          Complaint
        </h1>
        <button
          onClick={() => { }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>

      </div>

      <div className="space-y-6">
        {complaints.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-lg shadow p-4 flex gap-4"
          >
            {/* Complaint Image */}
            <img
              src={c.image}
              alt="complaint"
              className="w-36 h-36 object-cover rounded border"
            />

            {/* Complaint Details */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{c.title}</h2>
              <p className="text-gray-600 text-sm mb-2">
                {c.description}
              </p>

              <p className="font-medium">
                Status:{" "}
                <span className="text-blue-600">{c.status}</span>
              </p>

              {c.remark && (
                <p className="text-red-600 text-sm mt-1">
                  Remark: {c.remark}
                </p>
              )}

              {/* Action Buttons */}
              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">

                {/* Accept */}
                {c.status === "Submitted" && (
                  <button
                    onClick={() => updateStatus(c.id, "Accepted")}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Accept
                  </button>
                )}

                {/* In Process (ONLY ONCE) */}
                {c.status === "Accepted" && (
                  <button
                    onClick={() => updateStatus(c.id, "In Process")}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    In Process
                  </button>
                )}

                {/* Completed */}
                {c.status === "In Process" && (
                  <button
                    onClick={() => updateStatus(c.id, "Completed")}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Completed
                  </button>
                )}

                {/* Reject (ONLY when Submitted) */}
                {c.status === "Submitted" && (
                  <button
                    onClick={() => openRejectModal(c)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Reject
                  </button>
                )}

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Reject Modal */}
      {rejectId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">
              Reject Complaint
            </h2>

            <textarea
              className="w-full border p-2 rounded mb-4"
              rows="4"
              placeholder="Enter rejection remark..."
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
    </div>
  );
}



