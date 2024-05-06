const db = require('../models'); // Sequelize models
const User = db.User; // User model

exports.login = async (req, res) => {
  const { email, password, loginType } = req.body; // Get email, password, and login type from the request

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' }); // User does not exist
    }

    if (loginType === 'manual') {
      // For manual login, compare the provided password with the stored password
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid password' }); // Incorrect password
      }
    }

    // For social login, just check that the user exists
    if (loginType === 'social') {
      return res.status(200).json({ message: 'Login successful' }); // Successful social login
    }

    // If manual login is successful, return success
    return res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    return res.status(500).json({ error: 'An error occurred during login' }); // Handle unexpected errors
  }
};
