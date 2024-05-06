
// In routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Import the controller

// Define routes
router.post('/create', userController.createUser);

module.exports = router; // Correct router export
