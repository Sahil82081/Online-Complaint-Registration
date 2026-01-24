const { Schema } = require('mongoose');

const UserSchema = {
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}

const AdminSchema = {
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}

const officerSchema = {
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}

const ComplaintSchema = {
    complaint_id: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    img_of_problem: {
        type: String,
        required: true
    },
    img_of_proof: {
        type: String,
    },
    remark: {
        type: String,
    },
    officer:{
        type:Schema.Types.ObjectId,
        ref:'Officer'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}

module.exports = { UserSchema, ComplaintSchema ,AdminSchema ,officerSchema};