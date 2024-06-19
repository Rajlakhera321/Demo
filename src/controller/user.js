const mongoose = require("mongoose");
const userModel = require("../model/user");
const bcrypt = require("bcrypt")

const resetPassword = async (req, res) => {
    try {
        const { _id } = req.userData;
        const { password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        console.log(hashPassword)
        await userModel.findByIdAndUpdate(
            {
                _id: _id,
            },
            {
                $set: {
                    password: hashPassword,
                },
            },
        );
        return res
            .status(200)
            .json({ message: "Reset password successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { resetPassword }