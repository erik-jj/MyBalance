import { Model, DataTypes, Sequelize } from 'sequelize';
import { USERS_TABLE } from './users.model';
import { REASONS_TABLE } from './reasons.model';

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
  static assocciate() {
    //
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

export default { REGISTERS_TABLE, RegisterSchema, Register };
