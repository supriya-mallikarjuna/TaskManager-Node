const { List, Task } = require('../models');

// Create a new task for a specific list
exports.createTask = async (req, res) => {
    try {
      const { listId } = req.params;
      const { title } = req.body;
  
      const task = await Task.create({ title, listId });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, completed } = req.body;

    // Update the task with new data
    const [updated] = await Task.update(
      { title, completed }, // New data
      { where: { id: taskId } } // Condition to find the task
    );

    if (updated) {
      const updatedTask = await Task.findOne({ where: { id: taskId } });
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Delete the task with the specified ID
    const deleted = await Task.destroy({
      where: { id: taskId },
    });

    if (deleted) {
      res.status(200).json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get a task by ID
exports.getTaskById = async (req, res) => {
    try {
      const { taskId } = req.params; // Get the task ID from the route parameter
      const task = await Task.findOne({ where: { id: taskId } }); // Fetch the task from the database
  
      if (task) {
        res.status(200).json(task); // If the task is found, return it
      } else {
        res.status(404).json({ error: 'Task not found' }); // If no task, return an error
      }
    } catch (error) {
      res.status(500).json({ error: error.message }); // Handle server errors
    }
  };