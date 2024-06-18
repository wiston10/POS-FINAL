const { Suppliers, Phones } = require("../../db");
const { getiduser} =require('../../actions/getidusertoken');
const { Op } = require('sequelize');
module.exports = async (req, res) => {
  const { name, city,category } = req.query;

  const pageNumber = parseInt(req.query.pageNumber) || 1; // Página por defecto es 1
  const pageSize = parseInt(req.query.pageSize) || 6; // NUMERO DE ELEMENTOS
  let token = false;
  try {
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    } 
    if(!token){
      throw new Error('no tiene token')
    }
    const iduser =await getiduser(token);
    let filters = {};
    if(iduser&&token){
      filters.userIdsuplier=iduser;
    }
    if (name) {
        // Utiliza Op.like para buscar coincidencias parciales en el nombre
        filters.name = { [Op.like]: `%${name}%` };
      }
    if (city) {
      filters.city = { [Op.like]: `%${city}%` };
 
    }
    if (category) {
      filters.category = { [Op.like]: `%${category}%` };
 
    }
    const totalSuppliers = await Suppliers.count({ where: filters });
    const totalpages = Math.ceil(totalSuppliers / pageSize);

    const searchSuppliers = await Suppliers.findAll({ 
      where: filters,
      offset: (pageNumber - 1) * pageSize,
      limit: pageSize,
      include: [{
        model: Phones,
        as: 'Phones' // asociacion con celulares
    }]
    });

    res.status(200).json({
      data:  searchSuppliers,
      totalPages: totalpages,
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
