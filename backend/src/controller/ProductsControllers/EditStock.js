 
const { Products } = require('../../db');

const { getiduser} =require('../../actions/getidusertoken')
module.exports = async (req, res) => {
  const { store,id} = req.body;
  
  let token = false;
  if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
  }
  
  try {
    
    const iduser =await getiduser(token);

    if(!token){
      throw new Error('error en token');
    }

    if( !store){
      throw new Error('faltan datos para modificar un producto');
    }
   


    const productSQL=await Products.findOne({
      where:{id:id,userId:iduser},
    });
    productSQL.store=store;
    await productSQL.save();

    return res.status(200).json({
        status:'ok',
        message:"producto actualizado", }
    
    )} catch (error) {
    res.status(500).json({ error: error.message });
  }
};
