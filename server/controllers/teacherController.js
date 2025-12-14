const { ObjectId } = require('mongodb');

const getTeachers = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const teachers = await db.collection('teachers').find().toArray();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTeacher = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const teacher = req.body;
        teacher.createdAt = new Date();
        const result = await db.collection('teachers').insertOne(teacher);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTeacherById = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { id } = req.params;
        const teacher = await db.collection('teachers').findOne({ _id: new ObjectId(id) });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTeacher = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { id } = req.params;
        const updates = req.body;
        const result = await db.collection('teachers').updateOne(
            { _id: new ObjectId(id) },
            { $set: updates }
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTeacher = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { id } = req.params;
        const result = await db.collection('teachers').deleteOne({ _id: new ObjectId(id) });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTeachers,
    createTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher
};
