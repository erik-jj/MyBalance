import { ReasonsSchema, Reason } from './reasons.model.js';
import { RecurringSchema, Recurring } from './recurring.model.js';
import { RegisterSchema, Register } from './registers.model.js';
import { UserSchema, User } from './users.model.js';

function setupModels(sequelize) {
  Reason.init(ReasonsSchema, Reason.config(sequelize));
  Recurring.init(RecurringSchema, Recurring.config(sequelize));
  Register.init(RegisterSchema, Register.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
}

export default setupModels;
