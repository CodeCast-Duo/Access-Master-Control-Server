const config = require("../config/auth.config");
const db = require("../models");
const { authJwt } = require("../middlewares");
const User = db.user;

const neDB = require("../LocalDB/NeDB");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

exports.signup = (req, res) => {
  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  });

  user.save((err, user) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(500).send({ message: 'Username or email already exists' });
      }
      return res.status(500).send({ message: 'Server returned exeption' });
    }

    return res.send({ message: "User was registered successfully!" });

  });
};

exports.signin = (req, res) => {
  User.findOne({
    name: req.body.username,
  })
    .exec(async (err, user) => {
      if (err) {
        return res.status(500).send({ message: 'Server returned exeption' });
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id, role: user.role },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: config.jwtExpiration,
        });

      const refreshToken = jwt.sign({ id: user.id, role: user.role },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: config.jwtRefreshExpiration,
        });

        neDB.RefreshToken.createAndInsertRefreshTokenModel(token, refreshToken, function(successfully){
          if(successfully){
            return res.status(200).send({
              accessToken: token,
              refreshToken: refreshToken,
            });
          }
          return res.status(404).send({ message: "Local db work incorrect" });
        });
    });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    const refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken.id, { useFindAndModify: false }).exec();

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    const newAccessToken = jwt.sign({ id: refreshToken.user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

exports.signout = async (req, res) => {
  try {
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

exports.getuserdata = (req, res, next) => {
  const token = req.body.accessToken;

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }

    return res.status(200).send(decoded);
  });
};