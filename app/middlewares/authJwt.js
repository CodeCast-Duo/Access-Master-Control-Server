const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token,
    config.secret,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({ 
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    });
};

const hasRoleAccess = (role_access_level) => {
  return (req, res, next) => {
    User.findOne({ id: req.userId}).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: 'Server returned exeption' });
        return;
      }
    })

    if (user.hasRoleAccess(role_access_level)) {
      next();
      return;
    }
    return res.status(403).send({ message: `Require ${role_access_level}` });
  };
}

const authJwt = {
  verifyToken,
  hasRoleAccess
};

module.exports = authJwt;