const router = require("express").Router();
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const authContoller = require("./controller");
// -- Register --

passport.use(
  new localStrategy({ usernameField: "email" }, authContoller.localStrategy)
);
router.post("/register", authContoller.register);
router.post("/login", authContoller.login);
router.post("/logout", authContoller.logout);
router.get("/me", authContoller.me);

module.exports = router;
