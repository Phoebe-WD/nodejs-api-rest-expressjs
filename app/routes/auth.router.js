const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
  loginAuthSchema,
  recoveryAuthSchema,
} = require('../schemas/loginAuth.schema');
const validatorHandler = require('../middlewares/validator.handler');
const AuthService = require('../services/auth.service');
const service = new AuthService();

router.post(
  '/login',
  validatorHandler(loginAuthSchema, 'body'),
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/recovery',
  validatorHandler(recoveryAuthSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendMail(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
