const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const AuthService = require('../../services/auth.service');
const service = new AuthService();
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
        const user = await service.getUser(email, password);
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.use(JwTStrategy);
