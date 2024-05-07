const express = require('express');
const listsController = require('../controllers/listController'); // Import the controller

const router = express.Router();

// Route definitions
router.post('/create', listsController.createList); // Create a new list
router.get('/all', listsController.getAllLists); // Get all lists with tasks
router.delete('/:listId', listsController.deleteList); // Delete a list and its tasks
// Endpoint to get all tasks for a specific list by list ID
router.get('/:listId/tasks', listsController.getTasksByList);
router.put('/:listId', listsController.updateList);
module.exports = router;