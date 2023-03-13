const UserService = require('./users.service');
const service = new UserService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require('nodemailer');

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('Sorry, this email does not exist');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized('Ups! Wrong password');
    }
    delete user.dataValues.password;
  }
  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const secret = config.mySecret;

    const token = jwt.sign(payload, secret);
    return {
      user,
      token,
    };
  }
  async sendMail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('Sorry, you do not have permission');
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: config.appEmail,
        pass: config.appPassword,
      },
    });
    await transporter.sendMail({
      from: `'Phoebe 👩‍💻' <${config.appEmail}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Hello ❤', // Subject line
      text: 'Buenas buenas', // plain text body
      html: '<b>Nani?</b>', // html body
    });
    return { message: 'mail sent successfully' };
  }
}

module.exports = AuthService;
