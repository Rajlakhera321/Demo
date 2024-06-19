const { generatePassword } = require("../../shared/helper/password");
const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const fs = require("fs");
const handlebars = require("handlebars");
const { sendMail } = require("../../shared/helper/email");
const { omit } = require("lodash");
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    return jwt.sign(
        {
            data: user,
        },
        process.env.JWT_SECRET,
        { expiresIn: '10h' },
    )
}


const addUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const data = await userModel.find({ email: email });
        if (data.length !== 0) {
            return res.status(400).json({ message: "User already exists" });
        }
        const generatedPassword = generatePassword();
        const salt = bcrypt.genSaltSync(10)
        const password = await bcrypt.hashSync(generatedPassword, salt)
        await userModel.create({
            name,
            email,
            password,
            role
        })
        const htmlRequest = await fs.readFileSync(
            `${__dirname}/../../shared/emailTemplate/addUser.html`,
            "utf8"
        );
        const template = handlebars.compile(htmlRequest);
        const replacements = {
            name,
            password: generatedPassword,
            email,
        };
        const htmlToSend = template(replacements);
        const options = {
            from: '"Book Shop Owner"<process.env.USER_NAME >',
            to: email,
            subject: 'Welcome, Email',
            html: htmlToSend,
        };
        await sendMail(options);
        return res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await userModel.findOne({ email });
        if (!data) {
            return res.status(401).json({ message: "password_email_is_invalid" });
        }
        const comparePassword = await bcrypt.compareSync(password, data.password);
        if (!comparePassword) {
            return res
                .status(400)
                .json({ message: "password_email_is_invalid" });
        }
        const userData = omit(JSON.parse(JSON.stringify(data)), "password");
        return res.status(200).json({
            message: "Login Success",
            token: generateToken(userData),
            details: userData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { addUser, login };