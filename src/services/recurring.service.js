const { models } = require('../libs/sequelize.js');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const moment = require('moment');

class RecurringService {
  constructor() {}

  async create(data) {
    if (data.amount != 0) {
      data.pending = false;
    }
    const newRecurring = await models.Recurring.create(data);
    return newRecurring;
  }

  async findById(id) {
    const recurring = await models.Recurring.findByPk(id);
    if (!recurring) {
      throw boom.notFound('Recurring register not found');
    }
    return recurring;
  }

  async findByUserId(userId) {
    const user = await models.User.findByPk(userId);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const recurring = await models.Recurring.findAll({
      where: {
        idUser: userId,
      },
    });
    return recurring;
  }

  //for cron
  async findTodayRecurring() {
    const todayInit = moment().utcOffset(0).startOf('day').toDate();
    const todayEnd = moment().utcOffset(0).add(1, 'd').startOf('day').toDate();
    const registers = await models.Recurring.findAll(
      {
        where: {
          next_creation_date: {
            [Op.lte]: todayEnd,
            [Op.gte]: todayInit,
          },
        },
      },
      {
        include: [
          {
            association: 'reason',
            attributes: ['isIncome', 'name'],
          },
        ],
      }
    );
    return registers;
  }

  async update(id, changes) {
    const recurring = await this.findById(id);
    const rta = await recurring.update(changes);
    return rta;
  }

  async delete(id) {
    const recurring = await this.findById(id);
    await recurring.destroy();
    return { id };
  }
}
module.exports = RecurringService;
