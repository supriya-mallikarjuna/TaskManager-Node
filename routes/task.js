const express = require('express');
const taskController = require('../controllers/taskController'); // Import the controller

const router = express.Router();

// Route definitions
router.post('/:listId/createTask', taskController.createTask); // Create a new task for a list
// Endpoint to edit a task (PUT /tasks/:taskId)
router.put('/:taskId', taskController.updateTask);
// Endpoint to delete a task (DELETE /tasks/:taskId)
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;