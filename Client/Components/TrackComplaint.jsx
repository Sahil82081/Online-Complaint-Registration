import { useState } from "react";
function TrackComplaint({ complaints }) {

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState("");

  const statusColor = (status) => {
    if (status === "Submitted") return "bg-yellow-100 text-yellow-700";
    if (status === "In Progress") return "bg-blue-100 text-blue-700";
    if (status === "Resolved") return "bg-green-100 text-green-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-5xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">
          My Registered Complaints
        </h3>

        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="border rounded-xl p-4 flex flex-col md:flex-row gap-4"
            >
              {/* Image */}
              <img
                src={complaint.img_of_problem}
                alt="Complaint"
                className="w-full md:w-40 h-40 object-cover rounded-lg border"
              />

              {/* Details */}
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="text-xl font-semibold text-gray-800">
                    {complaint.title}
                  </h4>
                  <span className="text-sm text-gray-500">
                    ID: {complaint.complaint_id}
                  </span>
                </div>
                <p className="text-gray-500 text-lg">
                  {complaint.description}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Registered on: {new Date(complaint.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Status + Actions */}
              <div className="flex flex-col items-end justify-center gap-2">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${statusColor(
                    complaint.status
                  )}`}
                >
                  {complaint.status}
                </span>

                {/* Proof Button */}
                {complaint.status === "Resolved" && (
                  <button
                    onClick={() => {
                      setModalType("proof");
                      setModalData(complaint.img_of_proof);
                      setShowModal(true);
                    }}
                    className="bg-green-600 text-white text-sm px-4 py-1 rounded hover:bg-green-700"
                  >
                    Proof
                  </button>
                )}

                {/* Remark Button */}
                {complaint.status === "Rejected" && (
                  <button
                    onClick={() => {
                      setModalType("remark");
                      setModalData(complaint.remark);
                      setShowModal(true);
                    }}
                    className="bg-red-600 text-white text-sm px-4 py-1 rounded hover:bg-red-700"
                  >
                    Remark
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-600 text-xl"
            >
              ✕
            </button>

            {modalType === "proof" && (
              <>
                <h3 className="text-lg font-semibold mb-3">
                  Resolution Proof
                </h3>
                <img
                  src={modalData}
                  alt="Proof"
                  className="w-full rounded-lg border"
                />
              </>
            )}

            {modalType === "remark" && (
              <>
                <h3 className="text-lg font-semibold mb-3">
                  Rejection Remark
                </h3>
                <p className="bg-gray-100 p-4 rounded-lg text-gray-700">
                  {modalData}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default TrackComplaint;


