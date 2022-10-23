const { models, fn, where, col } = require('../libs/sequelize.js');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');
const moment = require('moment');

class RegisterService {
  constructor() {}

  async create(data) {
    if (data.amount == 0) {
      data.pending = true;
    }
    const newRegister = await models.Register.create(data);
    return newRegister;
  }

  async findById(id) {
    const register = await models.Register.findByPk(id, {
      include: [
        {
          association: 'reason',
          attributes: ['isIncome', 'name'],
        },
      ],
    });
    if (!register) {
      throw boom.notFound('Register not found');
    }
    return register;
  }

  async findRegisters(userId, query) {
    const user = await models.User.findByPk(userId);
    if (!user) {
      throw boom.notFound('User not found');
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

  async update(id, changes) {
    const register = await this.findById(id);
    const rta = await register.update(changes);
    return rta;
  }

  async delete(id) {
    const register = await this.findById(id);
    await register.destroy();
    return { id };
  }
}
module.exports = RegisterService;
