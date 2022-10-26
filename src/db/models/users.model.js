const { Model, DataTypes, Sequelize } = require('sequelize');
const USERS_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: 'column',
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'recovery_token',
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static assocciate(models) {
    this.hasMany(models.Reason, {
      as: 'reason',
      foreignKey: 'idUser',
    });
    this.hasMany(models.Recurring, {
      as: 'recurring',
      foreignKey: 'idUser',
    });
    this.hasMany(models.Register, {
      as: 'register',
      foreignKey: 'idUser',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USERS_TABLE,
      modelName: 'User',
      timestamps: false,
    };
  }
}

module.exports = { USERS_TABLE, UserSchema, User };
