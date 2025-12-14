const express = require('express');
const router = express.Router();
const {
    getStudentReport,
    getDashboardStats
} = require('../controllers/reportController');

router.get('/student/:id', getStudentReport);
router.get('/dashboard', getDashboardStats);

module.exports = router;
