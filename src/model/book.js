const { Schema, model, default: mongoose } = require("mongoose");

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
    },
    availability: {
        type: String,
        required: true,
        enum: ['sold', 'inStock'],
        default: 'inStock'
    },
    status: {
        type: String,
        required: true,
        enum: ['approved', 'rejected', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true });

module.exports = model('book', bookSchema);