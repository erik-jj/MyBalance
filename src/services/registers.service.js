const { models } = require('../libs/sequelize.js');
const boom = require('@hapi/boom');

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
