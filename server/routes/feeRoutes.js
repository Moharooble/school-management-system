const express = require('express');
const router = express.Router();
const {
    getFeeStructures,
    createFeeStructure,
    getPayments,
    recordPayment
} = require('../controllers/feeController');

// Structure
router.get('/structure', getFeeStructures);
router.post('/structure', createFeeStructure);

// Payments
router.get('/payments', getPayments);
router.post('/payments', recordPayment);

module.exports = router;
