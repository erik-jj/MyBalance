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
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
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
  static assocciate() {
    //
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
