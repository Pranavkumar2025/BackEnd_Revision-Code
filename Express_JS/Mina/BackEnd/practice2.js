const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  // Example JSON data
  const data = {
    message: 'Hello from the server!'
  };
  // Sending JSON response
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
