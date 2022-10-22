const { models } = require('../libs/sequelize.js');
const boom = require('@hapi/boom');

class ReasonService {
  constructor() {}

  async create(data) {
    const newReason = await models.Reason.create(data);
    return newReason;
  }

  async findByUserId(userId) {
    const user = await models.User.findByPk(userId);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const reasons = await models.Reason.findAll({
      where: {
        idUser: userId,
        isActive: true,
      },
    });
    return reasons;
  }

  async findById(id) {
    const reason = await models.Reason.findByPk(id);
    if (!reason) {
      throw boom.notFound('Reason not found');
    }
    delete reason.dataValues.isActive;
    return reason;
  }

  async update(id, changes) {
    const reason = await this.findById(id);
    const rta = await reason.update(changes);
    return rta;
  }

  async deactivate(id) {
    const reason = await this.findById(id);
    await reason.update({ isActive: false });
    return { id };
  }
}
module.exports = ReasonService;
