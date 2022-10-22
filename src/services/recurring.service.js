const { models } = require('../libs/sequelize.js');
const boom = require('@hapi/boom');

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
