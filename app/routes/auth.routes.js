const router = require('express').Router();
const { verifySignUp } = require("../middlewares");
const auth_controller = require("../controllers/auth.controller");

router.post('/signup', 
  [
   // verifySignUp.checkDuplicateUsernameOrEmail
  ],
  auth_controller.signup);

router.post('/signin',  auth_controller.signin);

router.post("/signout", auth_controller.signout);

module.exports = router;