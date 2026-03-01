import { useState , useEffect } from "react";
import TrackComplaint from "../Components/TrackComplaint.jsx";
import axios from "axios";
import { useStateContext } from "../Provider/StateProvider.jsx";
import { submit_complaint,get_complaints } from '../url/url.js'
import { useNavigate } from "react-router-dom";
function UserDashboard() {

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("register");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmited, setIsSubmitted] = useState(false);
  const { token } = useStateContext();
  const [complaintId, setComplaintId] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [data, setData] = useState({
    title: "",
    description: "",
  });

    const get_complaint = async (token) => {
      const response = await axios.get(get_complaints, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log("User complaints:", response.data.complaints);
      setComplaints(response.data.complaints);
    }
  
    useEffect(() => {
      if(token){
        get_complaint(token);
      }
    }, [token])

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SUBMIT COMPLAINT ================= */
  const handleSubmit = async () => {
    if (!data.title.trim() || !data.description.trim()) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (image) formData.append("image", image);

    try {

      const res = await axios.post(submit_complaint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
      setComplaints((prev)=>[...prev,res.data.complaint]);
      alert("Complaint registered successfully");
      setData({ title: "", description: "" });
      setImage(null);
      setPreview(null);
      setComplaintId(res.data.complaint_id);
      setIsSubmitted(true);
    } catch (error) {
      alert("Failed to submit complaint");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* ================= LOGOUT ================= */}
      <div className="flex justify-end items-center mb-3">
        <button
          onClick={() => {
            // logout();
            localStorage.clear();
            navigate('/')
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* ================= HEADER ================= */}
      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          User Dashboard
        </h2>
        <p className="text-gray-500">
          Register and track your complaints
        </p>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("register")}
          className={`px-6 py-2 rounded-lg font-semibold ${activeTab === "register"
            ? "bg-gray-700 text-white"
            : "bg-white border text-gray-700"
            }`}
        >
          Register Complaint
        </button>

        <button
          onClick={() => setActiveTab("track")}
          className={`px-6 py-2 rounded-lg font-semibold ${activeTab === "track"
            ? "bg-gray-700 text-white"
            : "bg-white border text-gray-700"
            }`}
        >
          Track Complaint
        </button>
      </div>

      {/* ================= REGISTER COMPLAINT ================= */}
      {activeTab === "register" && (
        isSubmited ? <>
          <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl mx-auto">
            <span className="text-lg">
              Your complaint has been submitted successfully!
            </span>
            <span className="text-lg">
              <p className="font-bold ">Complaint ID : {complaintId}</p>
              <p>You can track your complaint using this complaint ID or in Track Complaint .</p>
            </span>
          </div>

        </>
          :
          <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Register Complaint
            </h3>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">
                Complaint Title
              </label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                placeholder="Enter complaint title"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">
                Complaint Description
              </label>
              <textarea
                rows="4"
                name="description"
                value={data.description}
                onChange={handleChange}
                placeholder="Describe your issue"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400"
              />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">
                Upload Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-600"
              />
            </div>

            {/* Preview */}
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

            <button
              onClick={handleSubmit}
              className="w-full bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-800"
            >
              Submit Complaint
            </button>
          </div>

      )}

      {/* ================= TRACK COMPLAINT ================= */}
      {activeTab === "track" && <TrackComplaint complaints = {complaints}/>}
    </div>
  );
}

export default UserDashboard;

