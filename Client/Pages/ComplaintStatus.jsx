import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { complaint_status } from '../url/url'
import axios from "axios";
export default function ComplaintStatus() {
  const { id } = useParams(); // complaint_id
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(
          `${complaint_status}/${id}`
        );
        const data = await res.data;
        console.log("Fetched complaint data:", data);
        setComplaint(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-lg">

        <h2 className="text-xl font-bold mb-4 text-center">
          Complaint Status
        </h2>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-600">
            Loading complaint details...
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button
              className="mt-3 text-blue-600 underline"
              onClick={() => navigate("/")}
            >
              Go Back
            </button>
          </div>
        )}

        {/* Complaint Details */}
        {complaint && (
          <div className="space-y-4">

            <p>
              <strong>Complaint ID:</strong> {complaint.complaint_id}
            </p>

            <p>
              <strong>Title:</strong> {complaint.title}
            </p>

            <p>
              <strong>Description:</strong> {complaint.description}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded text-white ${complaint.status === "Resolved"
                  ? "bg-green-600"
                  : complaint.status === "In Process"
                    ? "bg-yellow-500"
                    : complaint.status === "Submitted"
                      ? "bg-gray-500"
                      : complaint.status === "Rejected"
                        ? "bg-red-600"
                        : "bg-gray-400"
                  }`}

              >
                {complaint.status}
              </span>
            </p>

            <p>
              <strong>Officer Remark:</strong>{" "}
              {complaint.remark || "No remark yet"}
            </p>

            {/* Image of Problem (Always show if exists) */}
            {complaint.img_of_problem && (
              <div>
                <p className="font-semibold mb-2">Image of Problem:</p>
                <img
                  src={complaint.img_of_problem}
                  alt="Problem"
                  className="w-full h-48 object-cover rounded border"
                />
              </div>
            )}

            {/* Image of Proof (Show only if Resolved) */}
            {complaint.status === "Resolved" &&
              complaint.img_of_proof && (
                <div>
                  <p className="font-semibold mb-2">
                    Proof of Resolution:
                  </p>
                  <img
                    src={complaint.img_of_proof}
                    alt="Proof"
                    className="w-full h-48 object-cover rounded border"
                  />
                </div>
              )}

            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
