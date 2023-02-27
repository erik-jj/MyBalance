const { models } = require('../libs/sequelize.js');
const hashPassword = require('../utils/pass-hash');
const boom = require('@hapi/boom');
const signTokenEmail = require('../utils/jwt/token-sign-email');
const tokenVerifyEmail = require('../utils/jwt/token-verify-email');
const { config } = require('../config/config.js');
const nodemailer = require('nodemailer');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await hashPassword(data.password);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    });
    delete newUser.dataValues.password;
    await this.sendEmailVerification(newUser.email);
    return newUser;
  }

  async findById(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
    });

    if (!user) {
      throw boom.unauthorized();
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findById(id);
    const { password } = changes;
    if (password) {
      const hash = await hashPassword(password);
      changes.password = hash;
    }
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findById(id);
    await user.destroy();
    return { id };
  }

  async sendEmailVerification(email) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = signTokenEmail(payload);
    const link = `${config.url}email-verify?token=${token}`;
    await this.update(user.id, { emailToken: token });
    const mail = {
      from: config.emailUser,
      to: user.email,
      subject: 'Verificación de correo',
      html: `<b>Ingresa a este link para verificar tu correo =>${link}</b>`,
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  async verifyEmail(token) {
    try {
      const payload = tokenVerifyEmail(token);
      const user = await this.findById(payload.sub);
      if (!user) {
        throw boom.unauthorized('invalid user');
      }
      if (user.emailToken !== token) {
        throw boom.unauthorized('Invalid token');
      }
      await this.update(user.id, {
        verified: true,
        emailToken: null,
      });
      return { message: 'account verified' };
    } catch (error) {
      throw boom.unauthorized();
    }
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
}
module.exports = UserService;
