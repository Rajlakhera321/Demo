const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
    try {
        let { name, phone, email, password } = req.body;
        console.log(req.body);
        const data = await userModel.findOne({ email: email });
        if (data) {
            return res.status(403).json({ message: "User already exists" });
        }
        password = await bcrypt.hashSync(password, 10);
        await userModel.create({ name, phone, email, password });
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await userModel.findOne({ email });
        if (!data) {
            return res.status(400).json({ message: "User not found!" });
        }
        const comparedPassword = await bcrypt.compare(password, data.password);
        if (!comparedPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = await jwt.sign({ data: { id: data._id } }, process.env.SECRETKEY, { expiresIn: process.env.EXPIREIN })
        return res.status(200).json({ message: "User logged in", token: token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { addUser, login };