var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController'); 

/* Create users  */
router.post('/users', userController.createUser); // Corrected function name

module.exports = router;

