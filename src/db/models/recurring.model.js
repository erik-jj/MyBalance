const { Model, DataTypes } = require('sequelize');
const { USERS_TABLE } = require('./users.model.js');
const { REASONS_TABLE } = require('./reasons.model.js');

const RECURRING_TABLE = 'recurring';

const RecurringSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  amount: {
    allowNull: false,
    type: DataTypes.DECIMAL,
    defaultValue: 0,
  },
  estimatedAmount: {
    allowNull: false,
    type: DataTypes.DECIMAL,
    field: 'estimated_amount',
    defaultValue: 0,
  },
  nextCreationDate: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'next_creation_date',
  },
  lastCreationDate: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'last_creation_date',
  },
  idUser: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'id_user',
    references: {
      model: USERS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  idReason: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'id_reason',
    references: {
      model: REASONS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
};

class Recurring extends Model {
  static assocciate(models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'idUser',
    });
    this.belongsTo(models.Reason, {
      as: 'reason',
      foreignKey: 'idReason',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RECURRING_TABLE,
      modelName: 'Recurring',
      timestamps: false,
    };
  }
}

module.exports = { RECURRING_TABLE, RecurringSchema, Recurring };
