const express = require('express');
const passport = require('passport');
const router = express.Router();
const loginAuthSchema = require('../schemas/loginAuth.schema');
const validatorHandler = require('../middlewares/validator.handler');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

router.post(
  '/login',
  validatorHandler(loginAuthSchema, 'body'),
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const secret = config.mySecret;

      const token = jwt.sign(payload, secret);
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
