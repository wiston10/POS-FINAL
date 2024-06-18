const { Sequelize ,DataTypes} = require('sequelize');
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
const namebase=process.env.DB_NAME;
const MODELS = require('./models/index');
 
const sequelize = new Sequelize(namebase, user,   password, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306, // Puerto predeterminado de MySQL
});

// DEFINE MODELS
for (const key in MODELS) {  //eslint-disable-line
 
  MODELS[key](sequelize);
}
// imports models for relations
const {
  Users,
  Products,
  Images ,
  Suppliers,
  Phones,
  Bills
} = sequelize.models;

Users.hasMany(Products, { foreignKey: 'userId' });
Products.belongsTo(Users, { as: 'Users', foreignKey: 'userId' });

Users.hasOne(Images);
Images.belongsTo(Users);

Users.hasMany(Suppliers, { foreignKey: 'userIdsuplier' });
Suppliers.belongsTo(Users, { as: 'Users', foreignKey: 'userIdsuplier' });

Products.hasMany(Images,{foreignKey:'productId'});
Images.belongsTo(Products,{as:'Products',foreignKey:'productId'});

Suppliers.hasMany(Phones,{foreignKey:'suppliersId'});
Phones.belongsTo(Suppliers,{as:'Suppliers',foreignKey:'suppliersId'});

Users.hasMany(Bills, { foreignKey: 'userId' });
Bills.belongsTo(Users, { as: 'Users', foreignKey: 'userId' });

Bills.belongsToMany(Products, { through: 'BillProducts', foreignKey: 'billId' });
Products.belongsToMany(Bills, { through: 'BillProducts', foreignKey: 'productId' });
const BillProducts = sequelize.define('BillProducts', {
  quantity: DataTypes.INTEGER// Agregar un campo para la cantidad del producto en la factura
});
Bills.hasMany(BillProducts, { foreignKey: 'billId' });
Products.hasMany(BillProducts, { foreignKey: 'productId' });
module.exports = {
    ...sequelize.models,
    db: sequelize,
  };