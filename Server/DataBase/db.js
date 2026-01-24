const mongoose = require('mongoose');

const { UserSchema, ComplaintSchema ,officerSchema,AdminSchema} = require('./Schema')

console.log(process.env.DATABASE_URL)
mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("DataBase Connected");
})


const User = mongoose.model('User', UserSchema);
const Complaint = mongoose.model('Complaint', ComplaintSchema);
const Admin = mongoose.model('Admin', AdminSchema);
const Officer = mongoose.model('Officer', officerSchema);


module.exports = { User, Complaint, Admin, Officer };