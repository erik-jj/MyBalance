const { USERS_TABLE, UserSchema } = require('../models/users.model.js');
const { REASONS_TABLE, ReasonSchema } = require('../models/reasons.model.js');
const {
  RECURRING_TABLE,
  RecurringSchema,
} = require('../models/recurring.model.js');
const {
  REGISTERS_TABLE,
  RegisterSchema,
} = require('../models/registers.model.js');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USERS_TABLE, UserSchema);
    await queryInterface.createTable(REASONS_TABLE, ReasonSchema);
    await queryInterface.createTable(RECURRING_TABLE, RecurringSchema);
    await queryInterface.createTable(REGISTERS_TABLE, RegisterSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USERS_TABLE);
    await queryInterface.dropTable(REASONS_TABLE);
    await queryInterface.dropTable(RECURRING_TABLE);
    await queryInterface.dropTable(REGISTERS_TABLE);
  },
};
