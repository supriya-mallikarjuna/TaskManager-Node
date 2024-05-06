const db = require('../models'); // Import Sequelize models
const User = db.User; // Access the User model

// Create a new user
exports.createUser = (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Create a new user in the database
  User.create({ username, email, password })
    .then((user) => {
      res.status(201).json(user); // HTTP 201 - Created
    })
    .catch((err) => {
      res.status(500).json({ error: err.message }); // Handle database errors
    });
};
