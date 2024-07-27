const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("connected successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connection };