import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminlogin } from "../url/url";
import axios from "axios";
import { useStateContext } from '../Provider/StateProvider'
function AdminLogin() {
  const navigate = useNavigate();
  const { setToken } = useStateContext()

  const [data, setData] = useState({
    username: "",
    password: ""
  })

  const handlechanges = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handlesubmit = async () => {
    try {
      const response = await axios.post(adminlogin, data);
      console.log("Admin login response:", response.data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        navigate('/admin-dashboard');
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log("Error during admin login:", error);
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Login failed");
      }
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-600 to-gray-800">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>


        <div className="mb-4">
          <label className="block text-gray-600 mb-1">
            Username
          </label>
          <input
            type="text"
            value={data.username}
            onChange={(e) => { handlechanges(e) }}
            name="username"
            placeholder="Enter your username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>


        <div className="mb-6">
          <label className="block text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            value={data.password}
            onChange={(e) => { handlechanges(e) }}
            name="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>


        <button
          onClick={() => handlesubmit()}
          className="w-full bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
        >
          Login
        </button>


        <br /> <br />
        <div className="flex items-center justify-center ">
          <div className="flex gap-5">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              onClick={() => { navigate('/') }}>
              User Login
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => { navigate('/officer-login') }}>
              Office Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
