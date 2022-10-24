const express = require('express');
const passport = require('passport');

const router = express.Router();
const signToken = require('../utils/jwt/token-verify');

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
      };
      const token = signToken(payload);
      res.json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
