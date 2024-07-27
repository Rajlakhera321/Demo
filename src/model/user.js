const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
},{timestamps: true});

module.exports = model('user', userSchema);