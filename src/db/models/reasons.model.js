const { Model, DataTypes } = require('sequelize');
const { USERS_TABLE } = require('./users.model.js');

const REASONS_TABLE = 'reasons';

const ReasonSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  isIncome: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'is_income',
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  isActive: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active',
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
};

class Reason extends Model {
  static assocciate(models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'idUser',
    });
    this.hasMany(models.Recurring, {
      as: 'recurring',
      foreignKey: 'idReason',
    });
    this.hasMany(models.Register, {
      as: 'register',
      foreignKey: 'idReason',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REASONS_TABLE,
      modelName: 'Reason',
      timestamps: false,
    };
  }
}

module.exports = { REASONS_TABLE, ReasonSchema, Reason };
