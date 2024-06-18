 
const {  Bills ,Products,BillProducts} = require('../../db');
 
 
const { getiduser} =require('../../actions/getidusertoken')
module.exports = async (req, res) => {
  const {idProduct,idBills,quantity} = req.body;
  let token = false;
  if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
  }
  console.log(quantity)
  try {
    if(!idProduct||!idBills||!quantity){
        throw new Error('faltan datos');
    }
    const iduser =await getiduser(token);
    if(!token){
      throw new Error('error en token');
    }
    const product = await Products.findByPk(idProduct);
    if(product.store<quantity){
      throw new Error("cantidad en store insuficiente")
    }
    const bill = await Bills.findByPk(idBills);
    if (!product || !bill) {
        throw new Error('Producto o factura no encontrado');
      }
      const existingRelation = await BillProducts.findOne({
        where: {
          billId: idBills,
          productId: idProduct
        }
      });
      if(!existingRelation){
      await BillProducts.create({
        billId: bill.id,
        productId: product.id,
        quantity: parseInt(quantity)
      });
      product.store -= parseInt(quantity);

      
      await product.save();
    
    }else{
      existingRelation.quantity +=parseInt(quantity)
      product.store -= parseInt(quantity);

      
      await product.save();
      await existingRelation.save();
    }
    res.status(200).json({ ms: "producto asociado correctamente"
    
     }); // `Location` contiene la URL del objeto en S3.
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
