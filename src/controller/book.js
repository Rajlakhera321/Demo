const { sendMail } = require("../../shared/helper/email");
const bookModel = require("../model/book");
const userModel = require("../model/user");
const handlebars = require("handlebars");
const fs = require("fs");

const addBook = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const data = await bookModel.create({
            title,
            description,
            price,
            createdBy: req.userData._id
        })
        const htmlRequest = await fs.readFileSync(
            `${__dirname}/../../shared/emailTemplate/bookApproval.html`,
            "utf8"
        );
        const template = handlebars.compile(htmlRequest);
        const replacements = {
            title,
            description,
            price,
            createdBy: req.userData._id
        };
        const htmlToSend = template(replacements);
        const options = {
            from: req.userData.email,
            to: process.env.USER_NAME,
            subject: 'Approval for new book',
            html: htmlToSend,
        };
        await sendMail(options);
        return res.status(201).json({ message: "Book sent for approval", data });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const approvalForUpdate = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const { id } = req.params;
        const htmlRequest = await fs.readFileSync(
            `${__dirname}/../../shared/emailTemplate/bookApproval.html`,
            "utf8"
        );
        const template = handlebars.compile(htmlRequest);
        const replacements = {
            id,
            title,
            description,
            price
        };
        const htmlToSend = template(replacements);
        const options = {
            from: req.userData.email,
            to: process.env.USER_NAME,
            subject: 'Approval of updation in book',
            html: htmlToSend,
        };
        await sendMail(options);
        return res.status(201).json({ message: "Book updation sent for approval" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const approveBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, createdBy } = req.body;
        if (status == 'rejected') {
            const user = userModel.find({ _id: createdBy });
            await bookModel.findByIdAndUpdate({ _id: id }, {
                $set: {
                    status
                }
            });
            const htmlRequest = await fs.readFileSync(
                `${__dirname}/../../shared/emailTemplate/rejection.html`,
                "utf8"
            );
            const template = handlebars.compile(htmlRequest);
            const replacements = {
                status: "Rejected"
            };
            const htmlToSend = template(replacements);
            const options = {
                from: process.env.USER_NAME,
                to: user.email,
                subject: 'Request for Extra Books',
                html: htmlToSend,
            };
            await sendMail(options);
            return res.status(200).json({ message: "Book rejected" });
        }
        await bookModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                status
            }
        });
        return res.status(200).json({ message: "Book updated" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, status, createdBy } = req.body;
        if (status == 'rejected') {
            console.log(createdBy)
            const user = await userModel.findOne({ _id: createdBy });
            console.log(user)
            const htmlRequest = await fs.readFileSync(
                `${__dirname}/../../shared/emailTemplate/rejection.html`,
                "utf8"
            );
            const template = handlebars.compile(htmlRequest);
            const replacements = {
                status: "Rejected"
            };
            const htmlToSend = template(replacements);
            const options = {
                from: process.env.USER_NAME,
                to: user.email,
                subject: 'Request for Extra Books',
                html: htmlToSend,
            };
            await sendMail(options);
            return res.status(200).json({ message: "Book rejected" });
        }
        const data = await bookModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                title,
                description,
                price,
            }
        });
        return res.status(200).json({ message: "Book updated" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getBooks = async (req, res) => {
    try {
        const data = await bookModel.find({ status: "approved", availability: "inStock" });
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getPendingBook = async (req, res) => {
    try {
        const data = await bookModel.find({ status: "pending" });
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const purchaseBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await bookModel.findByIdAndUpdate({ _id: id }, {
            $set: { availability: "sold" }
        });
        return res.status(200).json({ message: "Book Purchased" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const extraBook = async (req, res) => {
    try {
        const { title } = req.body;
        const htmlRequest = await fs.readFileSync(
            `${__dirname}/../../shared/emailTemplate/extraBook.html`,
            "utf8"
        );
        const template = handlebars.compile(htmlRequest);
        const replacements = {
            username: req.userData.name,
            title,
        };
        const htmlToSend = template(replacements);
        const options = {
            from: req.userData.email,
            to: process.env.USER_NAME,
            subject: 'Request for Extra Books',
            html: htmlToSend,
        };
        await sendMail(options);
        return res.status(201).json({ message: "Extra book request sent" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { addBook, approvalForUpdate, updateBook, approveBook, getBooks, purchaseBook, extraBook, getPendingBook }