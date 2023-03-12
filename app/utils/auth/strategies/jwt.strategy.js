const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');
const boom = require('@hapi/boom');
const secret = config.mySecret;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const JwTStrategy = new Strategy(options, (payload, done) => {
  if (!options.jwtFromRequest) {
    done(boom.unauthorized('We have missed the token'));
  }
  if (!options.secretOrKey) {
    done(boom.unauthorized('We have missed the secret'));
  }
  return done(null, payload);
});

module.exports = JwTStrategy;
