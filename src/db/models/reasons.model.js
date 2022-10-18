import { Model, DataTypes } from 'sequelize';
import { USERS_TABLE } from './users.model';

const REASONS_TABLE = 'reasons';

const ReasonsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  isIncome: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'is_income',
  },
  isActive: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: true,
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
  static assocciate() {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REASONS_TABLE,
      modelName: 'Reasons',
      timestamps: false,
    };
  }
}

export default { REASONS_TABLE, ReasonsSchema, Reason };
