const express = require('express');
const router = express.Router();
const {
    getExams,
    createExam,
    recordScore,
    getScores
} = require('../controllers/examController');

router.get('/exams', getExams);
router.post('/exams', createExam);
router.get('/scores', getScores);
router.post('/scores', recordScore);

module.exports = router;
