const express = require('express');
const router = express.Router();
const {
    getTeachers,
    createTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher
} = require('../controllers/teacherController');

router.get('/', getTeachers);
router.post('/', createTeacher);
router.get('/:id', getTeacherById);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

module.exports = router;
