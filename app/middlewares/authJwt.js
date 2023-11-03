const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.user = decoded;
    next();
  });
};

const hasRoleAccess = (role_access_level) => {
  return (req, res, next) => {
    User.findOne({ id: req.user.id}).exec((err, user) => {
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