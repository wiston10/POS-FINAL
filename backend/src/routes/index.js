const indexRoutes = require('express').Router();
 
 const routeUsers=require('./UserRoutes')
 const routesProducts=require('./ProductRoutes')
const routeSuppliers=require('./SuppliersRoutes')
const routeBills=require('./BillsRoutes')
indexRoutes
 
    .use('/users', routeUsers)
    .use('/suppliers',routeSuppliers)
    .use('/bills',routeBills)
    .use('/products',routesProducts);
    

indexRoutes.get('/', (req, res) => {
  res.send('Hello World!');
});
module.exports = indexRoutes;