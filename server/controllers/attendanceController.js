const { ObjectId } = require('mongodb');

const getAttendance = async (req, res) => {
    try {
        const db = req.app.locals.db;
        // Optional filters: date, class, student_id
        const { date, classId } = req.query;
        let query = {};
        if (date) query.date = date; // Expecting YYYY-MM-DD
        if (classId) query.classId = classId;

        const attendance = await db.collection('attendance').find(query).toArray();
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const markAttendance = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const attendanceData = req.body;
        // Expected body: { date: "YYYY-MM-DD", classId, records: [{ studentId, status }] }
        // For simplicity, let's just insert whatever comes in, or bulk write.

        // Single record insertion or array
        const result = await db.collection('attendance').insertOne(attendanceData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAttendance,
    markAttendance
};
