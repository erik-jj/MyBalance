const { Model, DataTypes, Sequelize } = require('sequelize');
const { USERS_TABLE } = require('./users.model.js');
const { REASONS_TABLE } = require('./reasons.model.js');

const REGISTERS_TABLE = 'registers';

const RegisterSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  amount: {
    allowNull: false,
    type: DataTypes.DECIMAL,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
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

class Register extends Model {
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
      tableName: REGISTERS_TABLE,
      modelName: 'Register',
      timestamps: false,
    };
  }
}

module.exports = { REGISTERS_TABLE, RegisterSchema, Register };
