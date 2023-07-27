var express = require('express');
var router = express.Router();

// TODO 
// Will change

// Define a route
router.get('/', (req, res) => {
    res.send('Hello, Express!');
  });

module.exports = router;