const {Schema, model} = require("mongoose");

const retreatSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Date
    },
    location: {
        type: String
    },
    price: {
        type: Number
    },
    type: {
        type: String
    },
    condition: {
        type: String
    },
    image: {
        type: String
    },
    tag: {
        type: Array
    },
    duration: {
        type: Number
    },
    id: {
        type: String
    }
},{timestamps: true});

module.exports = model('retreat', retreatSchema);