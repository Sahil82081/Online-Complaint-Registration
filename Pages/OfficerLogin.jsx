import { useNavigate } from "react-router-dom";

function OfficerLogin() {
  const navigate = useNavigate();

    const data = {
    username: "",
    password: ""
  }

  const handlechanges = (e) =>{
    data[e.target.name] = e.target.value;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-600 to-gray-800">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">



        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Office Login
        </h2>


        <div className="mb-4">
          <label className="block text-gray-600 mb-1">
            Username
          </label>
          <input
            type="text"
              value={data.username}
               onChange={(e)=>{handlechanges(e)}}
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
               onChange={(e)=>{handlechanges(e)}}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>


        <button
          onClick={() => navigate("/officer-dashboard")}
          className="w-full bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
        >
          Login
        </button>

        <br /> <br />
        <div className="flex items-center justify-center ">
          <div className="flex gap-5">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              onClick={()=>{navigate('/')}}>
              User Login
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={()=>{navigate('/admin-login')}}>
              Admin Login
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default OfficerLogin;
