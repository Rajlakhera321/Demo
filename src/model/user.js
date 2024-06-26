const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        requried: true,
        enum: ['user', 'admin', 'superAdmin']
    }
}, { timestamps: true });

module.exports = model('user', userSchema);