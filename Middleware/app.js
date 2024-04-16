const express = require('express');
const app = express();

// Middleware to simulate user authentication
const authenticateUser = (req, res, next) => {
  const { username } = req.query;
  if (username === 'admin') {
    // User is authenticated, allow access to the protected route
    next();
  } else {
    // User is not authenticated, send a 403 Forbidden response
    res.status(403).send('Unauthorized access');
  }
};

// Middleware to log the request method and URL
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

// Apply middleware globally
app.use(logRequest);

// Protected route that requires authentication
app.get('/protected', authenticateUser, (req, res) => {
  res.send('Welcome to the protected route!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
