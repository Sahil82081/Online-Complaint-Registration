const express = require('express');
const route = express.Router();
const UserController = require('../Controllers/UserControllers');
const upload = require('../Middleware/uploads');
const {userauth} = require('../Middleware/userauth');

route.get('/status', (req, res) => {
    res.json({ status: 'Server is running' });
});

route.post('/signup', UserController.signup);
route.post('/login', UserController.login);
route.post('/submit_complaint',userauth, upload.single("image"), UserController.submit_complaint);

route.post('/officerlogin', UserController.officerlogin);
route.get('/get_all_complaints', UserController.get_all_complaints);

route.patch(
  '/update_complaint/:id',
  UserController.update_complaint_status
);



route.post('/adminlogin', UserController.adminlogin);
route.get('/get_complaints',userauth, UserController.get_complaints);
route.post('/addofficer', UserController.addofficer);
route.get('/get_admin_dashboard',userauth, UserController.get_admin_dashboard);

module.exports = route