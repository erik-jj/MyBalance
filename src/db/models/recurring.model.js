import { Model, DataTypes } from 'sequelize';
import { USERS_TABLE } from './users.model';
import { REASONS_TABLE } from './reasons.model';

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
  static assocciate() {
    //
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

export default { RECURRING_TABLE, RecurringSchema, Recurring };
