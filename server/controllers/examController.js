const { ObjectId } = require('mongodb');

const getExams = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const exams = await db.collection('exams').find().toArray();
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createExam = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const exam = req.body; // { name: "Midterm", date: "..." }
        const result = await db.collection('exams').insertOne(exam);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const recordScore = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const scoreData = req.body; // { examId, studentId, score, subject }
        const result = await db.collection('scores').insertOne(scoreData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getScores = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { studentId, examId } = req.query;
        let query = {};
        if (studentId) query.studentId = studentId;
        if (examId) query.examId = examId;

        const scores = await db.collection('scores').find(query).toArray();
        res.json(scores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getExams,
    createExam,
    recordScore,
    getScores
};
