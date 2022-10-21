const { models } = require('../libs/sequelize.js');

class ReasonService {
  constructor() {}

  async create(data) {
    const newReason = await models.Reason.create(data);
    return newReason;
  }

  async findById(id) {
    const reason = await models.Reason.findById(id);
    if (!reason) {
      //boom error
    }
    return reason;
  }

  // async findByUserId(userId) {
  //   const reasons = await models.Reason.findAll({
  //     where: {
  //       '$user.id$': userId,
  //     },
  //     include: [
  //       {
  //         association: 'user',
  //       },
  //     ],
  //   });
  //   return reasons;
  // }

  async update(id, changes) {
    const reason = await this.findById(id);
    const rta = await reason.update(changes);
    return rta;
  }

  async delete(id) {
    const reason = await this.findById(id);
    await reason.destroy();
    return { id };
  }
}
module.exports = ReasonService;
