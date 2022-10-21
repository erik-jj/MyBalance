const { models } = require('../libs/sequelize.js');

class RegisterService {
  constructor() {}

  async create(data) {
    const newRegister = await models.Register.create(data);
    return newRegister;
  }

  async findById(id) {
    const register = await models.Register.findByPk(id);
    if (!register) {
      //boom error
    }
    return register;
  }

  // async findByUserId(userId) {
  //   const registers = await models.Register.findAll({
  //     where: {
  //       '$user.id$': userId,
  //     },
  //     include: [
  //       {
  //         association: 'user',
  //       },
  //     ],
  //   });
  //   return registers;
  // }

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
