const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Authentication controller

// Login endpoint
router.post('/login', authController.login); // POST endpoint for login

module.exports = router; // Export the router
