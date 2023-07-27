const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

app.use(cors());

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running`);
});