const { List, Task } = require('../models');

// Create a new list
exports.createList = async (req, res) => {
  try {
    const { name } = req.body;
    const list = await List.create({ name });
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all lists with their tasks
exports.getAllLists = async (req, res) => {
  try {
    const lists = await List.findAll({
      include: [{ model: Task, as: 'tasks' }],
    });
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Delete a list and its tasks
exports.deleteList = async (req, res) => {
  try {
    const { listId } = req.params;

    const deleted = await List.destroy({
      where: { id: listId },
    });

    if (deleted) {
      res.status(200).json({ message: 'List deleted' });
    } else {
      res.status(404).json({ error: 'List not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTasksByList = async (req, res) => {
    try {
      const { listId } = req.params; // Get the list ID from the route parameter
  
      const list = await List.findOne({
        where: { id: listId },
        include: [{ model: Task, as: 'tasks' }], // Include related tasks
      });
  
      if (list) {
        res.status(200).json(list.tasks); // Return the list's tasks
      } else {
        res.status(404).json({ error: 'List not found' }); // Handle if no list found
      }
    } catch (error) {
      res.status(500).json({ error: error.message }); // Handle server errors
    }
  };

  // Edit a list by ID
exports.updateList = async (req, res) => {
    try {
      const { listId } = req.params; // Get the list ID from the route parameter
      const { name } = req.body; // Data to update
  
      // Update the list based on ID
      const [updated] = await List.update(
        { name }, // Data to update
        { where: { id: listId } } // Condition to find the list
      );
  
      if (updated) {
        const updatedList = await List.findOne({ where: { id: listId } });
        res.status(200).json(updatedList); // Return the updated list
      } else {
        res.status(404).json({ error: 'List not found' }); // Handle if list not found
      }
    } catch (error) {
      res.status(500).json({ error: error.message }); // Handle server errors
    }
  };