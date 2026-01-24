import { useState } from "react";
import TrackComplaint from "../Components/TrackComplaint.jsx";

function UserDashboard() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [activeTab, setActiveTab] = useState("register");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex justify-end items-center mb-3">
        <button
          onClick={()=>{}}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>

      </div>
      
      {/* Header */}
      <div className="bg-white shadow rounded-xl p-4 mb-6 flex justify-between items-center">
        <div className="">
          <h2 className="text-2xl font-bold text-gray-800">
            User Dashboard
          </h2>
          <p className="text-gray-500">
            Register and track your complaints
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("register")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === "register"
              ? "bg-gray-700 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          Register Complaint
        </button>

        <button
          onClick={() => setActiveTab("track")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === "track"
              ? "bg-gray-700 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          Track Complaint
        </button>
      </div>

      {/* Register Complaint Section */}
      {activeTab === "register" && (
        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Register Complaint
          </h3>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">
              Complaint Title
            </label>
            <input
              type="text"
              placeholder="Enter complaint title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">
              Complaint Description
            </label>
            <textarea
              rows="4"
              placeholder="Describe your issue"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">
              Upload Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-gray-200 file:text-gray-700
              hover:file:bg-gray-300"
            />
          </div>

          {preview && (
            <div className="mb-4">
              <p className="text-gray-600 mb-2">Image Preview</p>
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded-lg border"
              />
            </div>
          )}

          <button className="w-full bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition duration-300">
            Submit Complaint
          </button>
        </div>
      )}

      {/* Track Complaint Section */}
      {activeTab === "track" && (
        <TrackComplaint />
      )}
    </div>
  );
}

export default UserDashboard;


