require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const dbConfig = require("./app/config/db.config");
const app = express();

var corsOptions = {
  origin: process.env.CORS_ORIGIN
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: [process.env.COOKIE_SECRET], // should use as secret environment variable
    httpOnly: true
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to web login and access test application." });
});

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
});

// routes
const auth_routes = require('./app/routes/auth.routes');
const user_routes = require('./app/routes/user.routes');

app.use('/api/auth', auth_routes);
app.use('/api/test', user_routes);

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});