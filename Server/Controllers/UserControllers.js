const db = require('../DataBase/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { cloudinary_upload } = require('../Utility/cloudinary.js');
const { generateComplaintId } = require('../Utility/id_generator.js');
module.exports.signup = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    // Validation
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const userExists = await db.User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: "user",
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );


    res.status(201).json({
      message: "User registered successfully",
      token
    });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};



module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Username/Email and password are required"
      });
    }

    // Find user by username OR email
    const user = await db.User.findOne({
      $or: [{ username }]
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: "user",
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );


    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.submit_complaint = async (req, res) => {
  try {
    console.log("Received complaint data:", req.body);

    const userid = req.user.id;
    let imageUrl = null;
    if (req.file) {
      imageUrl = await cloudinary_upload(req.file.path);
    }
    fs.unlinkSync(req.file.path);

    const complaint_id = generateComplaintId();

    const data = {
      complaint_id,
      userId: userid,
      title: req.body.title,
      description: req.body.description,
      status: 'Submitted',
      img_of_problem: imageUrl,
    }

    const complaint = await db.Complaint.create(data);

    res.status(201).json({ message: "Complaint submitted successfully", complaint_id ,complaint});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
}

module.exports.get_complaints = async (req, res) => {
  try {
    const userid = req.user.id;
    console.log("hello")
    console.log("Fetching complaints for user ID:", userid);
    const complaints = await db.Complaint.find({ userId: userid }).sort({ createdAt: -1 });
    console.log(complaints)
    res.status(200).json({ complaints });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
}

module.exports.adminlogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Username/Email and password are required"
      });
    }

    // Find user by username OR email
    const user = await db.Admin.findOne({
      $or: [{ username }]
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: "admin",
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );


    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
}

module.exports.addofficer = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const userExists = await db.Officer.findOne({
      username
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const officer = await db.Officer.create({
      name,
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      officer
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
}

module.exports.get_admin_dashboard = async (req, res) => {
  try {
    const complaints = await db.Complaint.find().select('userId title description status officer complaint_id img_of_problem').populate("userId", "fullname email username").populate("officer", "fullname username");
    const officer = await db.Officer.find()
    const users = await db.User.find().select('fullname email')

    res.status(200).json({ complaints, officer, users });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
}

module.exports.officerlogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await db.Officer.findOne({
      $or: [{ username }]
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: "officer",
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );


    res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
}

module.exports.get_all_complaints = async (req, res) => {
  try {
    const complaints = await db.Complaint.find().populate("userId", "fullname email username")
    console.log(complaints)
    res.status(200).json({ complaints });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
}


module.exports.update_complaint_status = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remark } = req.body;
    console.log("Update request body:", req.body);
    console.log("Update request file:", req.file);

    /* ================= ALLOWED STATUSES ================= */
    const allowedStatus = [
      "Submitted",
      "In Process",
      "Resolved",
      "Rejected",
    ];

    if (!status || !allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    /* ================= FIND COMPLAINT ================= */
    const complaint = await db.Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    /* ================= STATUS-SPECIFIC VALIDATION ================= */

    // 🔴 Reject → remark required
    if (status == "Rejected") {
      if (!remark || remark.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Remark is required for rejection",
        });
      }
      complaint.remark = remark;
    }


    if (status === "Resolved") {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Proof image is required",
        });
      }

      const uploadResult = await cloudinary_upload(req.file.path);

      complaint.img_of_proof = uploadResult;

      fs.unlinkSync(req.file.path);
    }

    complaint.status = status;
    complaint.officer = req.user.id;

    console.log("Updated complaint:", complaint);
    await complaint.save();

    return res.status(200).json({
      success: true,
      message: "Complaint status updated successfully",
      complaint,
    });
  } catch (error) {
    console.error("update_complaint_status error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


module.exports.complaint_status = async (req, res) => {
  try {
    const complaint = await db.Complaint.findOne({
      complaint_id: req.params.id
    })
      .populate("officer", "name email")
      .populate("userId", "name email");

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(complaint);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
}