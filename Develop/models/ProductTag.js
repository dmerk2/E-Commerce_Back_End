const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
   id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
   },
   product_id: {
    type: DataTypes.INTEGER,
    // REFERENCES THE PRODUCT MODELS ID
   },
   tag_id: {
    type: DataTypes.INTEGER,
    // REFERENCES THE TAG MODELS ID
   }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
