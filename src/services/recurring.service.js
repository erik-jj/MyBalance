const { models } = require('../libs/sequelize.js');

class RecurringService {
  constructor() {}

  async create(data) {
    const newRecurring = await models.Recurring.create(data);
    return newRecurring;
  }

  async findById(id) {
    const recurring = await models.Recurring.findById(id);
    if (!recurring) {
      //boom error
    }
    return recurring;
  }

  // async findByUserId(userId) {
  //   const recurring = await models.Recurring.findAll({
  //     where: {
  //       '$user.id$': userId,
  //     },
  //     include: [
  //       {
  //         association: 'user',
  //       },
  //     ],
  //   });
  //   return recurring;
  // }

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
