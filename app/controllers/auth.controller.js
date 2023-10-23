const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {//TODO add check username, email, pass before this function
  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate username or email
        return  res.status(500).send({ message: 'Username or email already exists' });
      }
      return res.status(500).send({ message: 'Server returned exeption' });
    }

    return res.send({ message: "User was registered successfully!" }); 
    
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
      .exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: 'Server returned exeption' });
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      const token = jwt.sign({ id: user.id, role: user.role },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      res.status(200).send({
        username: user.username,
        token: token
      });
    });
};

exports.signout = async (req, res) => {
  try {
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};