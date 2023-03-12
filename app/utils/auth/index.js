const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const UserService = require('../../services/users.service');
const service = new UserService();
const JwTStrategy = require('./strategies/jwt.strategy');
// * Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await service.findByEmail(email);
        if (!user) {
          done(boom.unauthorized('Sorry, this email does not exist'), false);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          done(boom.unauthorized('Ups! Wrong password'), false);
        }
        delete user.dataValues.password;
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.use(JwTStrategy);
