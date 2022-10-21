const { ReasonsSchema, Reason } = require( './reasons.model.js)';
const { RecurringSchema, Recurring } = require( './recurring.model.js');
const { RegisterSchema, Register } = require( './registers.model.js');
const { UserSchema, User } = require( './users.model.js');


function setupModels(sequelize) {
  Reason.init(ReasonsSchema, Reason.config(sequelize));
  Recurring.init(RecurringSchema, Recurring.config(sequelize));
  Register.init(RegisterSchema, Register.config(sequelize));
  User.init(UserSchema, User.config(sequelize));

  Reason.assocciate(sequelize.models);
  Recurring.assocciate(sequelize.models);
  Register.assocciate(sequelize.models);

}
module.exports = setupModels;
