const db = require('../models');  // Reference Sequelize models
const User = db.User;  // Reference the User model

exports.createUser = (req, res) => {
  const { username, email, password, loginType } = req.body;  // Extract data from request

  // Basic validation
  if (!username || !email || !loginType) {
    return res.status(400).json({ error: 'Username, email, and login type are required' });
  }

  // Ensure login type is valid
  if (loginType !== 'social' && loginType !== 'manual') {
    return res.status(400).json({ error: 'Invalid login type' });
  }

  // Check if a user with the same email already exists
  User.findOne({ where: { email } })  // Check for existing email
    .then((existingUser) => {
      if (existingUser) {
        return res.status(409).json({ error: 'Email is already registered. Please log in.' });  // Email conflict
      }

      // Create a new user in the database
      return User.create({ username, email, password, loginType })  // Password can be null for social login
        .then((user) => {
          res.status(201).json(user);  // HTTP 201 - Created
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });  // Handle database errors
    });
};
