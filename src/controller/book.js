const retreatModel = require("../model/retreat");
const bookModel = require("../model/book");
const axios = require("axios");
const { paginationData } = require("../../helper/pagination");

const retreatData = async (req, res) => {
    try {
        const { data } = await axios.get('https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats');
        await retreatModel.insertMany(data);
        return res.status(200).json({ message: "Data inserted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const addBook = async (req, res) => {
    try {
        const { user_id, retreat_id } = req.body;
        const data = await bookModel.findOne({ user_id: user_id, retreat_id: retreat_id });

        if (data) {
            return res.status(400).json({ message: "retreat already booked by user" });
        }
        const book = await bookModel.create({ ...req.body, booking_date: Date.now() });
        return res.status(201).json({ message: "Book created successfully", book });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const getRetreat = async (req, res) => {
    try {
        const data = await retreatModel.find();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const filterRetreat = async (req, res) => {
    try {
        const { filter, location, search } = req.query;
        let query = {}

        if (filter) {
            query.condition = { $regex: new RegExp(filter, "i") };
        }

        if (location) {
            query.location = { $regex: new RegExp(location.trim(), "i") };
        }

        if (search) {
            query.$or = [
                { title: { $regex: new RegExp(search.trim(), "i") } },
                { description: { $regex: new RegExp(search.trim(), "i") } },
                { condition: { $regex: new RegExp(search.trim(), "i") } }
            ]
        }

        const { offset, limit } = paginationData(req);

        const retreatData = await retreatModel.aggregate([
            { $match: query },
            { $skip: offset },
            { $limit: limit }
        ])
        return res.status(200).json(retreatData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = { retreatData, addBook, getRetreat, filterRetreat };