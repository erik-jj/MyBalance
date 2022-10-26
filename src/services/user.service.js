const { models } = require('../libs/sequelize.js');
const hashPassword = require('../utils/pass-hash');
const boom = require('@hapi/boom');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await hashPassword(data.password);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async findById(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
    });
    if (!user) {
      throw boom.unauthorized();
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findById(id);
    const { password } = changes;
    if (password) {
      const hash = await hashPassword(password);
      changes.password = hash;
    }
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findById(id);
    await user.destroy();
    return { id };
  }
}
module.exports = UserService;
