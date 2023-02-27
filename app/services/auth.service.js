const boom = require('@hapi/boom');
const UserService = require('./user.service');
const verifyPassword = require('../utils/pass-verify');
const nodemailer = require('nodemailer');
const { config } = require('../config/config.js');
const signTokenAccount = require('../utils/jwt/token-sign-account');
const signTokenRecovery = require('../utils/jwt/token-sign-recovery');
const tokenVerifyRecovery = require('../utils/jwt/token-verify-recovery');
const tokenVerifyAccount = require('../utils/jwt/token-verify-account');

const service = new UserService();

class AuthService {
  constructor() {}

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    delete user.dataValues.emailToken;
    return user;
  }

  async reAuthenticate(token) {
    try {
      const payload = tokenVerifyAccount(token);
      const user = await service.findById(payload.sub);
      if (!user) {
        throw boom.unauthorized();
      }
      return this.signTokenAccount(user);
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  signTokenAccount(user) {
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    delete user.dataValues.emailToken;
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };
    const token = signTokenAccount(payload);
    return {
      user,
      token,
    };
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = signTokenRecovery(payload);
    const link = `${config.url}password-change?token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.emailUser, // sender address
      to: user.email, // list of receivers
      subject: 'Recuperación de contraseña', // Subject line
      html: `<b>Ingresa a este link para recuperar la contraseña =>${link}</b>`, // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = tokenVerifyRecovery(token);
      const user = await service.findById(payload.sub);
      if (!user) {
        throw boom.unauthorized();
      }
      if (user.recoveryToken !== token) {
        throw boom.unauthorized('Invalid token');
      }
      await service.update(user.id, {
        recoveryToken: null,
        password: newPassword,
      });
      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}
module.exports = AuthService;
