const {Schema, modle, model} = require("mongoose");

const bookSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }, 
    user_name: {
        type: String
    },
    user_email: {
        type: String
    },
    user_phone: {
        type: String
    },
    retreat_id: {
        type: Schema.Types.ObjectId,
        ref: 'retreat'
    },
    retreat_title: {
        type: String
    },
    retreat_location: {
        type: String
    },
    retreat_price: {
        type: Number
    },
    retreat_duration: {
        type: Number
    },
    payment_details: {
        type: Number
    },
    booking_date: {
        type: Date
    }
},{timestamps: true});

module.exports = model('book', bookSchema);