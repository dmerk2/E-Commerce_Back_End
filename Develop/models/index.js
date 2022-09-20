// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Products belongToMany Tags (through ProductTag)
// Product.belongsToMany(ProductTag, {
//   foreignKey: 'tag_name',
// });

// Tags belongToMany Products (through ProductTag)
// Tag.belongsToMany(ProductTag, {
//   foreignKey: 'product_tag',
//   onDelete: "CASCADE",
// });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
