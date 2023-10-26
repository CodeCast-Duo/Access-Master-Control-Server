const router = require('express').Router();
const { verifySignUp } = require("../middlewares");
const auth_controller = require("../controllers/auth.controller");

router.post('/signup',
  [

  ],
  auth_controller.signup);

router.post('/signin', auth_controller.signin);

router.post("/refreshtoken", auth_controller.refreshToken);

router.post("/signout", auth_controller.signout);

router.post("/getuserdata", auth_controller.getuserdata);

module.exports = router;