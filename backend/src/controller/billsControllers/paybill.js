const { Bills, Products} = require("../../db");
const { getiduser } = require("../../actions/getidusertoken");

module.exports = async (req, res) => {
  let token = false;

  const idbill =req.params.id;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  try {
    if (!token) {
      throw new Error("error en token");
    }
    const iduser = await getiduser(token);
    const bill = await Bills.findOne({
      where: {
        id: idbill,
        userId: iduser,
      },
      include: [
        {
          model: Products ,
          through: { attributes: ['quantity'] }  
            
        },

      ]
    });
   
    var products = bill.Products;
     let total=0;
    for(var i=0; i< products.length;i++){
        const billproduct=products[i].BillProducts;
        total += parseInt(products[i].price) * parseInt(billproduct.dataValues.quantity) 
    }
    const putbill=await Bills.findOne({
        where:{
            id:idbill
        }
    })
    if(total!=0){
        putbill.total=total;
        putbill.state='finish';
        await putbill.save()
    }
   
    res.status(200).json({
      data: products,
      total:total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
