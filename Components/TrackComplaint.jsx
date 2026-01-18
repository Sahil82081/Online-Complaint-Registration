function TrackComplaint() {
  // Dummy data (replace later with backend API data)
  const complaints = [
    {
      id: 101,
      title: "Road Damage",
      description: "Big pothole near main road",
      status: "Pending",
      date: "10 Jan 2026",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 102,
      title: "Street Light Issue",
      description: "Street light not working",
      status: "In Progress",
      date: "12 Jan 2026",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 103,
      title: "Water Leakage",
      description: "Water leakage in pipeline",
      status: "Resolved",
      date: "14 Jan 2026",
      image: "https://via.placeholder.com/150",
    },
  ];

  const statusColor = (status) => {
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
    if (status === "In Progress") return "bg-blue-100 text-blue-700";
    if (status === "Resolved") return "bg-green-100 text-green-700";
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-5xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-700 mb-6">
        My Registered Complaints
      </h3>

      <div className="space-y-4">
        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className="border rounded-xl p-4 flex flex-col md:flex-row gap-4"
          >
            
            <img
              src={complaint.image}
              alt="Complaint"
              className="w-full md:w-40 h-40 object-cover rounded-lg border"
            />

            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-800">
                {complaint.title}
              </h4>
              <p className="text-gray-500 text-sm">
                {complaint.description}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Registered on: {complaint.date}
              </p>
            </div>

            <div className="flex items-center">
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${statusColor(
                  complaint.status
                )}`}
              >
                {complaint.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackComplaint;

