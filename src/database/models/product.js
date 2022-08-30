import { DataTypes } from 'sequelize';
import { sequelize } from '../index.js'

export const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    unique: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(5),
    allowNull: false
  }
});