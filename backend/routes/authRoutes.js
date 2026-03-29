const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const authController = require('../controllers/authController');
const signToken = require("../utils/jwtHelper");

router.post('/register', authController.register);
router.post('/login', authController.login);
// router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);
// POST /check-email
router.post("/check-email", authController.checkEmail);
// Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  (req, res, next) => {
  console.log("Callback route hit");
  next();
},
  passport.authenticate("google", { session: false , failureRedirect: `${process.env.FRONTEND_URL}/login?message=login_failed`}),
  (req, res) => {
    const accessToken = signToken(
      req.user._id,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN
    );
    const username = req.user.name;
    res.cookie("accessToken", accessToken, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    });
    res.cookie("username", username, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    });
    res.redirect(
      `${process.env.FRONTEND_URL}/account`
    );
  }
);

// Facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ['public_profile',"email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login?message=login_failed` }),
  (req, res) => {
    const accessToken = signToken(
      req.user._id,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN
    );
    const username = req.user.name;
    res.cookie("accessToken", accessToken, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    });
    res.cookie("username", username, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    });

    res.redirect(
      `${process.env.FRONTEND_URL}/account`
    );
  }
);

module.exports = router;
