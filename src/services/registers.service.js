const { models, fn, where, col } = require('../libs/sequelize.js');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');
const moment = require('moment');

class RegisterService {
  constructor() {}

  async create(userId, data) {
    const reason = await models.Reason.findOne({
      where: {
        id: data.idReason,
        idUser: userId,
      },
    });
    if (!reason) {
      throw boom.unauthorized();
    }
    if (data.amount == 0) {
      data.pending = true;
    }
    const newRegister = await models.Register.create({
      ...data,
      idUser: userId,
    });
    return newRegister;
  }

  async findRegisters(userId, query) {
    const user = await models.User.findByPk(userId);
    if (!user) {
      throw boom.unauthorized();
    }
    if (!user.verified) {
      throw boom.unauthorized();
    }
    const options = {
      month: moment().month() + 1,
      year: moment().year(),
      where: {},
    };
    const { month, year } = query;
    if (month && year) {
      options.month = parseInt(month);
      options.year = parseInt(year);
    }
    options.where = {
      id_user: user.id,
      [Op.and]: [
        where(fn('month', col('create_at')), options.month),
        where(fn('year', col('create_at')), options.year),
      ],
    };
    const registers = await models.Register.findAll(options, {
      include: [
        {
          association: 'reason',
          attributes: ['isIncome', 'name'],
        },
      ],
    });
    return registers;
  }

  async findById(id, userId) {
    const options = {
      where: {
        id: id,
        idUser: userId,
      },
      include: [
        {
          association: 'reason',
          attributes: ['isIncome', 'name'],
        },
      ],
    };

    const register = await models.Register.findOne(options);
    if (!register) {
      throw boom.unauthorized();
    }
    return register;
  }

  async update(id, changes, userId) {
    if (changes.idReason) {
      await this.findUserReason(changes.idReason, userId);
    }
    const register = await this.findById(id, userId);
    const rta = await register.update(changes);
    return rta;
  }

  async delete(id, userId) {
    const register = await this.findById(id, userId);
    await register.destroy();
    return { id };
  }

  async findUserReason(idReason, userId) {
    const reason = await models.Reason.findOne({
      where: {
        id: idReason,
        idUser: userId,
      },
    });
    if (!reason) {
      throw boom.unauthorized();
    }
  }
}
module.exports = RegisterService;
