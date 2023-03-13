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
    delete user.dataValues.recoveryToken;
    return user;
  }
  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.mySecret);
    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('Sorry, you do not have permission');
    }
    const payload = {
      sub: user.id,
    };
    const secret = config.mySecret;

    const token = jwt.sign(payload, secret, { expiresIn: '15min' });
    const link = `http://myfrotend.com/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: `'Phoebe 👩‍💻' <${config.appEmail}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Hello ❤, here is the link to recover your password', // Subject line
      text: 'Buenas buenas', // plain text body
      html: `<b>Enter to this link => ${link} </b>`, // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }
  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.mySecret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized('Sorry, you do not have permission');
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash });
      return { message: 'password changed successfully' };
    } catch (error) {
      boom.unauthorized('Sorry, you do not have permission');
    }
  }
  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: config.appEmail,
        pass: config.appPassword,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent successfully' };
  }
}

module.exports = AuthService;
