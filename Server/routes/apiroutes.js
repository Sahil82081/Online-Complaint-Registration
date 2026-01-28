const express = require('express');
const route = express.Router();
const UserController = require('../Controllers/UserControllers');
const upload = require('../Middleware/uploads');
const { userauth } = require('../Middleware/userauth');
const role = require('../Middleware/role');

route.get('/status', (req, res) => {
  res.json({ status: 'Server is running' });
});

route.get('/complaint_status/:id', UserController.complaint_status);
route.post('/signup', UserController.signup);
route.post('/login', UserController.login);
route.post('/submit_complaint', userauth, role('user'), upload.single("image"), UserController.submit_complaint);
route.get('/get_complaints', userauth, role('user'), UserController.get_complaints);



route.post('/officerlogin', UserController.officerlogin);
route.get('/get_all_complaints', userauth, role('officer'), UserController.get_all_complaints);
route.patch('/update_complaint/:id', userauth, role('officer'), upload.single("img_of_proof"),UserController.update_complaint_status);



route.post('/adminlogin', UserController.adminlogin);
route.post('/addofficer', userauth, role('admin'), UserController.addofficer);
route.get('/get_admin_dashboard', userauth, role('admin'), UserController.get_admin_dashboard);

module.exports = route