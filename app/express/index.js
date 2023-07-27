const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

app.use(cors());

const router = require('./routers');

app.use('/', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running ${process.env.HOST_URL}:${process.env.PORT}`);
});

module.exports = {
  app
};