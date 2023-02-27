const { ReasonSchema, Reason } = require('./reasons.model.js');
const { RecurringSchema, Recurring } = require('./recurring.model.js');
const { RegisterSchema, Register } = require('./registers.model.js');
const { UserSchema, User } = require('./users.model.js');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Reason.init(ReasonSchema, Reason.config(sequelize));
  Recurring.init(RecurringSchema, Recurring.config(sequelize));
  Register.init(RegisterSchema, Register.config(sequelize));

  User.assocciate(sequelize.models);
  Reason.assocciate(sequelize.models);
  Recurring.assocciate(sequelize.models);
  Register.assocciate(sequelize.models);
}
module.exports = setupModels;
