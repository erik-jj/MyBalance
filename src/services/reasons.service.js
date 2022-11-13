const { models } = require('../libs/sequelize.js');
const boom = require('@hapi/boom');

class ReasonService {
  constructor() {}

  async create(user, data) {
    const newReason = await models.Reason.create({ ...data, idUser: user.sub });
    return newReason;
  }

  async findByUserId(userId) {
    const user = await models.User.findByPk(userId);
    if (!user) {
      throw boom.notFound('User not found');
    }
    if (!user.verified) {
      throw boom.notFound('user not found');
    }
    const reasons = await models.Reason.findAll({
      where: {
        idUser: userId,
        isActive: true,
      },
    });
    return reasons;
  }

  async findById(id, userId) {
    const reason = await models.Reason.findOne({
      where: {
        id: id,
        idUser: userId,
      },
    });
    if (!reason) {
      throw boom.notFound('Reason not found');
    }
    delete reason.dataValues.isActive;
    return reason;
  }

  async update(id, changes, userId) {
    const reason = await this.findById(id, userId);
    const rta = await reason.update(changes);
    return rta;
  }

  async deactivate(id,userId) {
    const reason = await this.findById(id, userId);
    await reason.update({ isActive: false });
    return { id };
  }
}
module.exports = ReasonService;
