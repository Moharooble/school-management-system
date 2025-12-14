const { ObjectId } = require('mongodb');

const getClasses = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const classes = await db.collection('classes').find().toArray();
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createClass = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const classData = req.body;
        classData.createdAt = new Date();
        const result = await db.collection('classes').insertOne(classData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ... other class methods as needed
// keeping it simple for now

module.exports = {
    getClasses,
    createClass
};
