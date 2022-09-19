// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: '',
  onDelete: 'CASCADE',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: '',
  onDelete: 'CASCADE'
});

// Products belongToMany Tags (through ProductTag)
// Product.belongsToMany(ProductTag, {
//   foreignKey: '',
//   onDelete: 'CASCADE'
// });

// Tags belongToMany Products (through ProductTag)
// Tag.belongsToMany(ProductTag, {
//   foreignKey: "",
//   onDelete: "CASCADE",
// });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
