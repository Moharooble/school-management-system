const { ObjectId } = require('mongodb');

// This will be injected or imported. For now using placeholder or we need to pass db instance.
// In a real app with native driver, we usually pass the db instance or have a database module export it.
// I will start by assuming 'req.app.locals.db' or similar, or I'll create a database module.
// For now, let's export a function that takes the db as an argument, or use a singleton pattern.

// Let's use a singleton pattern for the DB connection in a separate file to make this cleaner.
// But for "basic code", I'll just put the logic here assuming I can access the collection.

// Actually, let's create a db.js file to handle connection and export the client/db.
// But I already put it in index.js. I should refactor index.js to export the db.

const getStudents = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const students = await db.collection('students').find().toArray();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createStudent = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const student = req.body;
        // Basic validation could go here
        student.createdAt = new Date();
        const result = await db.collection('students').insertOne(student);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStudentById = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { id } = req.params;
        const student = await db.collection('students').findOne({ _id: new ObjectId(id) });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateStudent = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { id } = req.params;
        const updates = req.body;
        const result = await db.collection('students').updateOne(
            { _id: new ObjectId(id) },
            { $set: updates }
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { id } = req.params;
        const result = await db.collection('students').deleteOne({ _id: new ObjectId(id) });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getStudents,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent
};
