const { Suppliers, Phones } = require("../../db");
const { getiduser} =require('../../actions/getidusertoken');
 
module.exports = async (req, res) => {
  const { id } = req.params; 
  let token = false;
  try {
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    } 
    if(!token){
      throw new Error('no tiene token')
    }
    const iduser =await getiduser(token); 
    const searchSuppliers = await Suppliers.findOne({ 
      where: {id:id,userIdsuplier:iduser},
      include: [{
        model: Phones,
        as: 'Phones' // asociacion con celulares
    }]
    });

    res.status(200).json({
      data:  searchSuppliers,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
