const { Model, DataTypes, Sequelize } = require('sequelize');

const BRANDS_TABLE = 'brands';

const BrandSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  brandName: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Brand extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: BRANDS_TABLE,
      modelName: 'Brand',
      timestamps: false,
    };
  }
}

module.exports = { BRANDS_TABLE, BrandSchema, Brand };
