const { ObjectId } = require('mongodb');

// Fee Structure (e.g., Grade 1 = $50)
const getFeeStructures = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const fees = await db.collection('fee_structures').find().toArray();
        res.json(fees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createFeeStructure = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const result = await db.collection('fee_structures').insertOne(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Payments
const getPayments = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const payments = await db.collection('payments').find().toArray();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const recordPayment = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const payment = req.body;
        payment.date = new Date();
        const result = await db.collection('payments').insertOne(payment);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getFeeStructures,
    createFeeStructure,
    getPayments,
    recordPayment
};
