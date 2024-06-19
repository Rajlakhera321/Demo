const mongoose = require("mongoose");

const connection = async (req,res) => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connection successful")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connection;